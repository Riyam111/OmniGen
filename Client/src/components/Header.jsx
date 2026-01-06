import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { motion } from "motion/react"
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
const Header = () => {
  const {user,setShowLogin}=useContext(AppContext)
  const navigate=useNavigate()
  const onClickHandler=()=>{
if(user){
  navigate('/ai')
}
else{
  setShowLogin(true)
}
  }
  return (
    <motion.div className="flex flex-col items-center text-center px-4 mt-16 sm:mt-24
    "initial={{opacity:0.2,y:100}} transition={{duration:1}}
    whileInView={{opacity:1,y:0}}
    viewport={{once:true}}>

      {/* Badge */}
      <motion.div className="flex items-center gap-2 bg-white/80 backdrop-blur
        px-5 py-1.5 rounded-full border border-neutral-300 shadow-sm
        text-sm sm:text-base text-gray-600"
        initial={{opacity:0,y:-20}} 
    animate={{opacity:1,y:0}}
    transition={{delay:0.2,duration:0.8}}
    >
        <span>Create amazing content with AI tools</span>
        <img src={assets.star_icon} className="w-4 sm:w-5" alt="" />
      </motion.div>

      {/* Heading */}
      <motion.h1 className="mt-8 text-3xl sm:text-6xl lg:text-7xl
        font-extrabold leading-tight max-w-[320px] sm:max-w-[620px]
        bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
        bg-clip-text text-transparent"
        initial={{opacity:0}}
        animate={{opacity:1}}
        transition={{delay:0.4,duration:2}}>
        Turn prompts into outcomes.
      </motion.h1>

      {/* Optional sub text */}
      <motion.p className="mt-4 text-sm sm:text-lg text-gray-500 max-w-[280px] sm:max-w-[520px]"
      initial={{opacity:0,y:20}}
        animate={{opacity:1,y:0}}
        transition={{delay:0.6,duration:0.8}}>
        Describe your need and get AI-powered results fast.
      </motion.p>
<motion.button onClick={onClickHandler}
  className="
    group mt-8
    flex items-center gap-2
    px-8 sm:px-12 py-2.5 sm:py-3
    text-sm sm:text-lg font-medium text-white
    rounded-full
    bg-gradient-to-r from-black via-gray-900 to-black
    shadow-lg
    hover:shadow-xl
    hover:scale-105
    transition-all duration-300
    active:scale-95
  "
initial={{opacity:0}}
animate={{opacity:1}}
transition={{default:{duration:0.5},opacity:{delay:0.8,duration:1}}}
>
  Start creating now
  <img
    src={assets.star_group}
    alt=""
    className="
      h-5 sm:h-6
      transition-transform duration-300
      group-hover:rotate-12
    "
  />
</motion.button>
<motion.div
 initial={{opacity:0}}
        animate={{opacity:1}}
        transition={{delay:1,duration:1}}
className='flex flex-wrap justify-center mt-16 gap-3'>
  {Array(6).fill('').map((item,index)=>(
<motion.img
whileHover={{scale:1.05,duration:0.1}}
className='rounded hover:scale-105 transition-all duration-300 cursor-pointer max-sm:w-10' src={index%2===0?assets.sample_img_1:assets.sample_img_2} alt='' key={index} width={70}/>
  ))}
</motion.div>
<motion.p 
 initial={{opacity:0}}
        animate={{opacity:1}}
        transition={{delay:1.2,duration:0.8}}
className='mt-2 text-neutral-600'>
  Generated images from OmniGen
</motion.p>
    </motion.div>
  )
}

export default Header
