import express from 'express'
import {registerUser,loginUser, userCredits, paymentRazorpay, verifyRazorpay, getUserCreations, getPublishCreations, toggleLikeCreations} from '../controllers/userController.js'
import userAuth from '../middlewares/auth.js'
const userRouter=express.Router()
userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.get('/credits',userAuth,userCredits)
userRouter.post('/pay-razor',userAuth,paymentRazorpay)
userRouter.post('/verify-razor',userAuth,verifyRazorpay)
userRouter.get('/get-user-creations',userAuth,getUserCreations)
userRouter.get('/get-published-creations',userAuth,getPublishCreations)
userRouter.post('/toggle-like-creation',userAuth,toggleLikeCreations)

export default userRouter