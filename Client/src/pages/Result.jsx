import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { motion } from "motion/react"
import { AppContext } from '../context/AppContext'
const Result = () => {
  const[image,setImage]=useState(assets.sample_img_1)
  const [isIsImageLoaded,setIsImageLoaded]=useState(false)
  const[loading ,setLoading]=useState(false)
  const [input,setInput]=useState('')
  const {generateImage}=useContext(AppContext)
  const [publish, setPublish] = useState(false);

  const onSubmitHandler=async(e)=>{
  e.preventDefault()
setLoading(true)
if(input){
  const image=await generateImage(input,publish)
  if(image){
    setIsImageLoaded(true)
    setImage(image)
  }
}
setLoading(false)
  }
  return (
    <motion.form 
    
     initial={{opacity:0.2,y:100}} transition={{duration:1}}
    whileInView={{opacity:1,y:0}}
    viewport={{once:true}}
    onSubmit={onSubmitHandler}  className='flex flex-col min-h-[90vh] justify-center items-center'>
      <div>
      <div className='relative'>
        <img src={image} alt="" className='max-w-sm rounded ' />
        <span className={`absolute bottom-0 left-0 h-1 bg-blue-500
        ${loading?'w-full transition-all duration-[10s]':'w-0'}`}/>
      </div>
      <p className={!loading?'hidden':''}>Loading....</p>
    </div>
   {!isIsImageLoaded && (
        <div className='flex flex-col items-center gap-4 mt-10 w-full max-w-xl'>
          
          <div className='flex w-full bg-neutral-500 text-white text-sm p-0.5 rounded-full'>
            <input
              onChange={e => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder='Describe what you want to generate'
              className='flex-1 bg-transparent outline-none ml-8 max-sm:w-20 placeholder-color'
            />
            <button type='submit' className='bg-zinc-900 px-10 sm:px-16 py-3 rounded-full'>
              Generate
            </button>
          </div>

          {/* Moved Checkbox here so user can select it BEFORE clicking generate */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="publish-check"
              checked={publish}
              onChange={(e) => setPublish(e.target.checked)}
              className="w-4 h-4 cursor-pointer"
            />
            <label htmlFor="publish-check" className="text-sm text-gray-700 cursor-pointer">
              Publish this image to community
            </label>
          </div>
        </div>
      )}
   {/* --- ACTION GROUP (Shows AFTER generation) --- */}
      {isIsImageLoaded && (
        <div className="flex flex-col items-center mt-10 gap-4">
          <div className="flex flex-wrap gap-2 justify-center text-white text-sm">
            <p
              onClick={() => {
                setIsImageLoaded(false);
                setPublish(false);
                setInput(''); // Optional: clear input for next generate
              }}
              className="bg-transparent border border-zinc-900 text-black px-8 py-3 rounded-full cursor-pointer"
            >
              Generate Another
            </p>

            <a
              className="bg-zinc-900 px-10 cursor-pointer py-3 rounded-full flex items-center"
              href={image}
              download
            >
              Download
            </a>
          </div>
        </div>
      )}
      </motion.form>
  )}
export default Result
