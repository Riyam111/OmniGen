import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import razorpay from 'razorpay'
import transactionModel from "../models/transactionModel.js";
import creationModel from "../models/creationModel.js";
const registerUser=async(req,res)=>{
try {
    const {name,email,password}=req.body;
    if(!name|| !email ||!password){
        return res.json({success:false,message:'Missing Details'})

    }
    const salt=await bcrypt.genSalt(10)
    const hashedPassword=await bcrypt.hash(password,salt)
    const userData={
        name,
        email,
        password:hashedPassword
    }
    const newUser=new userModel(userData)
    const user=await newUser.save()
    const token=jwt.sign({id:user._id},process.env.JWT_SECRET)
    res.json({success:true,token,user:{name:user.name}})

} catch (error) {
    console.log(error)
    res.json({success:false,message:error.message,id: user._id})
}
}

const loginUser=async(req,res)=>{
    try {
       const {email,password}=req.body;
        const user=await userModel.findOne({email})
        if(!user){
           return res.json({success:false,message:'User does not exist'}) 
        }
       const isMatch=await bcrypt.compare(password,user.password) 
       if(isMatch){
         const token=jwt.sign({id:user._id},process.env.JWT_SECRET)
       res.json({success:true,token,user:{name:user.name,id: user._id}})
      
        }
       else{
 return res.json({success:false,message:'Invalid credentials'}) 
       }
    } catch (error) {
         console.log(error.message)
    res.json({success:false,message:error.message})
    }
}
const userCredits=async(req,res)=>{
    try {
        
        const user=await userModel.findById(req.userId)
        res.json({success:true,credits:user.creditBalance,
            user:{name:user.name,id: user._id}
        })
    } catch (error) {
         console.log(error.message)
    res.json({success:false,message:error.message})
    }
}
const razorpayInstance=new razorpay({
    key_id:process.env.RAZORPAY_KEY_ID,
   key_secret:process.env.RAZORPAY_KEY_SECRET,
});
const paymentRazorpay=async(req,res)=>{
    try {
        const {planId}=req.body
        const userId=req.userId
        const userData=await userModel.findById(userId)
        if (!userData) {
  return res.json({ success: false, message: "User not found" });
}

        if(!userId||!planId){
            return res.json({success:false,message:'Missing Details'})
        }
        let credits,plan,amount,date
        switch (planId) {
            case 'Basic':
                plan='Basic'
                credits=100
                amount=10
                break;
            case 'Advanced':
                plan='Advanced'
                credits=500
                amount=50
                break;
            case 'Business':
                plan='Business'
                credits=5000
                amount=250
                break;  
                
        
            default:
                return res.json({success:false,message:'plan not found'});
        }
        date=Date.now();
        const transactionData={
            userId,plan,amount,credits,date
        }
       const newTransaction=await transactionModel.create(transactionData)
       const options={
        amount:amount*100,
        currency:process.env.CURRENCY,
        receipt:newTransaction._id
       }
       await razorpayInstance.orders.create(options,(error,order)=>{
if(error){
    console.log(error);
    return res.json({success:false,message:error.message})
}
res.json({success:true,order})
       })
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
        
    }
}
const verifyRazorpay=async(req,res)=>{
try {
    const {razorpay_order_id}=req.body
    const orderInfo=await razorpayInstance.orders.fetch(razorpay_order_id)
    if(orderInfo.status==='paid'){
        const transactionData=await transactionModel.findById(orderInfo.receipt)
        if(transactionData.payment){
            return res.json({success:false,message:'payment failed'})
        }
      const userData=await userModel.findById(transactionData.userId)
      const creditBalance=userData.creditBalance+transactionData.credits
      await userModel.findByIdAndUpdate(userData._id,{creditBalance})
        await transactionModel.findByIdAndUpdate(transactionData._id,{payment:true})
        res.json({success:true,message:"credits added"})

    }
    else{
        res.json({success:false,message:"Payment Failed"})
    }
} catch (error) {
    console.log(error);
        res.json({success:false,message:error.message}) 
}
}


export {registerUser,loginUser,userCredits,paymentRazorpay,verifyRazorpay}
export const getUserCreations = async (req, res) => {
  try {
    const userId = req.userId;

    const creations = await creationModel
      .find({ userId })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      creations,
    });

  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};
export const getPublishCreations = async (req, res) => {
  try {

    const creations = await creationModel
      .find({ publish:true})
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      creations,
    });

  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};
export const toggleLikeCreations = async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.body;

    const creation = await creationModel.findById(id);
    if (!creation) {
      return res.json({ success: false, message: "Creation not found" });
    }

    const alreadyLiked = creation.likes.some(
      (likeId) => likeId.toString() === userId.toString()
    );

    let message;

    if (alreadyLiked) {
      await creationModel.findByIdAndUpdate(id, {
        $pull: { likes: userId }
      });
      message = "Creation Unliked";
    } else {
      await creationModel.findByIdAndUpdate(id, {
        $addToSet: { likes: userId }
      });
      message = "Creation Liked";
    }

    res.json({ success: true, message });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
