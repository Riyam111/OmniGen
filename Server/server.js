import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import userRouter from './routes/userRoutes.js'
import imageRouter from './routes/imageRoutes.js'
import aiRouter from './routes/aiRoutes.js'
import connectCloudinary from './config/cloudinary.js'

const PORT=process.env.PORT ||4000
const app=express()
await connectCloudinary()
app.use(express.json())
app.use(cors())
await connectDB()
app.use('/api/user',userRouter)
app.use('/api/image',imageRouter)
app.use('/api/ai',aiRouter)
app.get('/',(req,res)=>res.send("Api working fine"))
app.listen(PORT,()=>console.log(
    'server running on port '+PORT
));
