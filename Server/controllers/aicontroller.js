import axios from "axios";
import userModel from "../models/userModel.js";
import creationModel from "../models/creationModel.js";
import fs from 'fs/promises'
import PDFParser from "pdf2json";


export const generateArticle = async (req, res) => {
  try {
    const userId = req.userId;
    const { prompt,length } = req.body;

    if (!prompt) {
      return res.json({ success: false, message: "Prompt is required" });
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    if (user.creditBalance <= 0) {
      return res.json({ success: false, message: "No credits left",creditBalance: user.creditBalance, });
    }
    const finalPrompt = `
      You are an expert long-form content writer. 
      Task: Write a comprehensive, deeply detailed article based on this topic: "${prompt}"
      
      Requirements:
      - Target Length: At least ${length || 1200} words.
      - Structure: Include an introduction, at least 6-8 detailed sub-headings (H2/H3), a case study or example section, and a concluding summary.
      - Style: Informative, engaging, and professional.
      - Detail: Explain complex concepts in depth. Do not be brief.
    `;
    const { data } = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text:finalPrompt}],
          },
        ],

        generationConfig: {
  maxOutputTokens: 2500,
  temperature: 0.8, // Higher temperature leads to more descriptive text
  topP: 0.95,
},
      }
    );

    const content = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!content) {
      return res.json({
        success: false,
        message: "Failed to generate content",
      });
    }

    await creationModel.create({
      userId,
      prompt,
      content,
      type: "article",
      publish: false,
    });

    user.creditBalance -= 1;
    await user.save();

    res.json({
      success: true,
      content,
      creditBalance: user.creditBalance,
    });

  } catch (error) {
    console.error("Gemini API Error:", error.response?.data || error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};
export const generateBlogTitle = async (req, res) => {
  try {
    const userId = req.userId;
    const { prompt } = req.body;

    if (!prompt) {
      return res.json({ success: false, message: "Prompt is required" });
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    if (user.creditBalance <= 0) {
      return res.json({ success: false, message: "No credits left",creditBalance: user.creditBalance, });
    }
const titlePrompt = `
  Topic: "${prompt}"
  Generate 3 distinct blog titles. 
  
  You MUST format the response exactly like this (including the stars and line breaks):
  
  **CATEGORY 1 (Basic):** [Title here]
  
  **CATEGORY 2 (Intermediate):** [Title here]
  
  **CATEGORY 3 (Advanced):** [Title here]

  Instructions: Return ONLY these three lines. Use double line breaks between categories.
`;
    const { data } = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: titlePrompt }] }],
        generationConfig: {
          maxOutputTokens: 800,
          temperature: 0.8, // Adds a bit of variety to the titles
        topP: 0.9,
        },
      }
    );

    const content = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!content) {
      return res.json({
        success: false,
        message: "Failed to generate content",
      });
    }

    await creationModel.create({
      userId,
      prompt,
      content,
      type: "blog",
      publish: false,
    });

    user.creditBalance -= 1;
    await user.save();

    res.json({
      success: true,
      content,
      creditBalance: user.creditBalance,
    });

  } catch (error) {
    console.error("Gemini API Error:", error.response?.data || error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};
export const reviewResume=async(req,res)=>{
try {
    // const userId = req.userId;     // ✅ from auth middleware
    const resume = req.file; 
    const userId=req.userId;
    const user=await userModel.findById(userId)
    if (!resume) {
  return res.json({ success:false, message:"Resume file required" });
}

    if(!user){
        return res.json({success:false,message:'user not found'})
    }
    if(resume.size>5*1024*1024){
  return res.json({success:false,message:"resume file size exceeds allowed size (5mb)."})
}
   if (user.creditBalance <= 0) {
  return res.json({
    success: false,
    message: "No credit balance",
    creditBalance: user.creditBalance,
  });
}
// --- NEW PDF PARSING METHOD ---
    const pdfParser = new PDFParser(this, 1); // "1" means text-only mode (faster)

    const pdfText = await new Promise((resolve, reject) => {
      pdfParser.on("pdfParser_dataError", errData => reject(errData.parserError));
      pdfParser.on("pdfParser_dataReady", pdfData => {
        // Get raw text and remove excessive whitespace/empty lines
        const rawText = decodeURIComponent(pdfParser.getRawTextContent());
        const cleanedText = rawText
          .replace(/\r\n/g, ' ')
          .replace(/\s+/g, ' ')
          .trim();
        resolve(cleanedText);
      });
      pdfParser.loadPDF(resume.path);
    });
    // ------------------------------

    // Cleanup: Delete the file after reading
    await fs.unlink(resume.path);

const prompt = `
      Act as a Lead Technical Recruiter. Perform an exhaustive review of this resume. 
      You MUST provide all 7 sections. Keep each section dense but do not ramble so you don't hit the token limit.

      RESUME: ${pdfText.slice(0, 8000)}

      STRUCTURE:
      1. **ATS & Alignment**: Score/100 and brief reasoning.
      2. **Technical Audit**: Missing FAANG-level libraries (TS, Testing, etc.).
      3. **Impact Gap**: Rewrite 2 bullet points using the X-Y-Z formula.
      4. **Project Deep Dive**: Specific "Pro" features to add to their current projects.
      5. **Competitive Ranking**: How they compare to other NIT/Tier-1 students.
      6. **RED FLAGS**: Address the 2025 date issue and any other errors.
      7. **6-Month Roadmap**: 3 specific technical milestones.

      END the response with: "RE-EVALUATION COMPLETE."
    `;
  const { data } = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],

         generationConfig: {
          maxOutputTokens: 3000,
          temperature:0.4
        },
      }
    );
    const content = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!content) {
      return res.json({
        success: false,
        message: "Failed to generate content",
      });
    }
await creationModel.create({
      userId,
      prompt:'Review the uploaded resume',
      content,
      type: "resume",
    });
await userModel.findByIdAndUpdate(user._id,{creditBalance:
user.creditBalance-1
})
res.json({success:true,message:"reviewed resume",
    creditBalance:user.creditBalance-1,content
})

} catch (error) {
    console.log(error.message);
    res.json({success:false,message:error.message})
    
}
}
