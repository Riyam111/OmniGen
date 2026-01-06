
import userModel from "../models/userModel.js";
import FormData from "form-data"
import axios from "axios"
import {v2 as cloudinary}from "cloudinary";
import creationModel from "../models/creationModel.js";
export const generateImage=async(req,res)=>{
try {
    // const userId = req.userId;     // ✅ from auth middleware
    const { prompt,publish } = req.body; 
    const userId=req.userId;
    const user=await userModel.findById(userId)
    if(!user||!prompt){
        return res.json({success:false,message:'Missing detail'})
    }
   if (user.creditBalance <= 0) {
  return res.json({
    success: false,
    message: "No credit balance",
    creditBalance: user.creditBalance,
  });
}

const formData=new FormData()
formData.append('prompt',prompt)
const {data}=await axios.post('https://clipdrop-api.co/text-to-image/v1',formData,{
   headers: {
    'x-api-key': process.env.CLIPDROP_API,
  }, 
  responseType:'arraybuffer'
})
const base64Image=Buffer.from(data,'binary').toString('base64')
const resultImage=`data:image/png;base64,${base64Image}`
const{secure_url}=await cloudinary.uploader.upload(resultImage)
await creationModel.create({
      userId,
      prompt,
      content: secure_url,
      type: "image",
      publish: publish ?? false,
    });
await userModel.findByIdAndUpdate(user._id,{creditBalance:
user.creditBalance-1
})
res.json({success:true,message:"Image Generated",
    creditBalance:user.creditBalance-1,secure_url
})

} catch (error) {
    console.log(error.message);
    res.json({success:false,message:error.message})
    
}
}
export const removeImageBackground=async(req,res)=>{
try {
    // const userId = req.userId;     // ✅ from auth middleware
    const  image  = req.file; 
    const userId=req.userId;
    const user=await userModel.findById(userId)
     if (!image) {
      return res.json({ success: false, message: "Image required" });
    }
    if(!user){
        return res.json({success:false,message:'user not found'})
    }
   if (user.creditBalance <= 0) {
  return res.json({
    success: false,
    message: "No credit balance",
    creditBalance: user.creditBalance,
  });
}

const{secure_url}=await cloudinary.uploader.upload(image.path,{
    transformation:[{
        effect:'background_removal',
        background_removal:'remove_the_background'
    }]
})
await creationModel.create({
      userId,
      prompt:'Remove background from image',
      content: secure_url,
      type: "image",
    });
await userModel.findByIdAndUpdate(user._id,{creditBalance:
user.creditBalance-1
})
res.json({success:true,message:"Background removed",
    creditBalance:user.creditBalance-1,secure_url
})

} catch (error) {
    console.log(error.message);
    res.json({success:false,message:error.message})
    
}
}
export const removeImageObject=async(req,res)=>{
try {
    // const userId = req.userId;     // ✅ from auth middleware
    const  image  = req.file; 
    const userId=req.userId;
    const {object}=req.body;
    const user=await userModel.findById(userId)
     if (!image) {
      return res.json({ success: false, message: "Image required" });
    }
    if(!user){
        return res.json({success:false,message:'user not found'})
    }
   if (user.creditBalance <= 0) {
  return res.json({
    success: false,
    message: "No credit balance",
    creditBalance: user.creditBalance,
  });
}

const{public_id}=await cloudinary.uploader.upload(image.path)
const imageUrl=cloudinary.url(public_id,{
    transformation:[{effect:`gen_remove:${object}`}],
    resource_type:'image'
})
await creationModel.create({
      userId,
      prompt:`Removed ${object} from image`,
      content: imageUrl,
      type: "image",
    });
await userModel.findByIdAndUpdate(user._id,{creditBalance:
user.creditBalance-1
})
res.json({success:true,message:"object removed",
    creditBalance:user.creditBalance-1,imageUrl
})

} catch (error) {
    console.log(error.message);
    res.json({success:false,message:error.message})
    
}
}