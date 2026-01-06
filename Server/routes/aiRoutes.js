import express from "express"
import userAuth from '../middlewares/auth.js'
import { generateArticle, generateBlogTitle, reviewResume } from "../controllers/aicontroller.js"
import { upload } from "../config/multer.js"
const aiRouter=express.Router()
aiRouter.post('/generate-article',userAuth,generateArticle)
aiRouter.post('/generate-blog-title',userAuth,generateBlogTitle)
aiRouter.post('/resume-review',upload.single('resume'),userAuth,reviewResume)

export default aiRouter