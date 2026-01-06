import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { motion } from "motion/react"
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
const GenerateBtn = () => {
   const {user,setShowLogin}=useContext(AppContext)
  const navigate=useNavigate()
  const onClickHandler=()=>{
if(user){
  navigate('/result')
}
else{
  setShowLogin(true)
}
  }
  return (
    <motion.div 
    initial={{opacity:0.2,y:100}} transition={{duration:1}}
    whileInView={{opacity:1,y:0}}
    viewport={{once:true}}
    
    className="pb-16 text-center">
      <h1 className="text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold text-neutral-800 py-6 md:py-16">
        See the magic. Try now
      </h1>

      <button onClick={onClickHandler}
        className="
          group mx-auto
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
      >
       Explore AI Tools
        <img
          src={assets.star_group}
          alt="Generate icon"
          className="
            h-5 sm:h-6
            transition-transform duration-300
            group-hover:rotate-12
          "
        />
      </button>
    </motion.div>
  )
}

export default GenerateBtn
