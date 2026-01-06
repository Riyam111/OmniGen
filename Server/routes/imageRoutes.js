import express from 'express'
import {generateImage, removeImageBackground, removeImageObject} from '../controllers/imageController.js'
import userAuth from '../middlewares/auth.js'
import { upload } from '../config/multer.js'
const imageRouter=express.Router()
imageRouter.post('/generate-image',userAuth,generateImage)
imageRouter.post('/remove-image-background',upload.single('image'), userAuth,removeImageBackground)
imageRouter.post('/remove-image-object',upload.single('image'),userAuth,removeImageObject)
export default imageRouter