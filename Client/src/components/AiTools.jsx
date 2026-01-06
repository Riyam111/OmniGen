import React from 'react'
import { AiToolsData } from '../assets/assets'
import { motion } from "motion/react"
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
const AiTools = () => {
  const navigate=useNavigate()
  const {user,setShowLogin}=useContext(AppContext)
  return (
    <motion.div 
    initial={{opacity:0.2,y:100}} transition={{duration:1}}
    whileInView={{opacity:1,y:0}}
    viewport={{once:true}}
    className="flex flex-col items-center px-4 mt-24 sm:mt-32">

      {/* Title */}
      <h1 className="text-2xl sm:text-4xl font-bold mb-2 text-center">
       Powerful AI Tools
      </h1>
      <p className="text-sm sm:text-lg text-gray-500 mb-10 text-center max-w-xl mx-auto">
        Everything you need to create, enhance, and optimize your content with cutting-edge AI technology
      </p>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10'>
        {AiToolsData.map((tool,index)=>(
<div key={index} className="p-8 rounded-lg bg-[#FDFDFE] shadow-lg border border-gray-100 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
onClick={() => {
  if (user) navigate(tool.path)
  else setShowLogin(true)
}}
>
<tool.Icon className="w-12 h-12 p-3 text-white rounded-xl"
style={{
                background: `linear-gradient(to bottom, ${tool.bg.from}, ${tool.bg.to})`,
              }}/>
                <h3 className="mt-6 mb-3 text-lg font-semibold">{tool.title}</h3>
            <p className="text-gray-400 text-sm max-w-[95%]">
              {tool.description}</p>
</div>
        ))} 
      </div>

    </motion.div>
  )
}

export default AiTools
