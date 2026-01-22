import React from 'react'
import { AiToolsData } from '../assets/assets'
import { motion } from "framer-motion"
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { ChevronRight } from 'lucide-react'

const AiTools = () => {
  const navigate = useNavigate()
  const { user, setShowLogin } = useContext(AppContext)

  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }} 
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="flex flex-col items-center px-4 mt-24 sm:mt-32 max-w-7xl mx-auto"
    >
      {/* Title Section */}
      <div className="text-center mb-16">
        <motion.h1 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="text-3xl sm:text-5xl font-bold mb-4 text-white tracking-tight"
        >
          Powerful AI Tools
        </motion.h1>
        <p className="text-sm sm:text-lg text-gray-400 max-w-xl mx-auto leading-relaxed">
          Everything you need to create, enhance, and optimize your content with cutting-edge AI technology
        </p>
      </div>

      {/* Tools Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full'>
        {AiToolsData.map((tool, index) => (
          <motion.div 
            key={index}
            whileHover={{ y: -10 }}
            className="group relative p-8 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-xl transition-all duration-500 cursor-pointer overflow-hidden hover:bg-white/10 hover:border-white/20"
            onClick={() => {
              if (user) navigate(tool.path)
              else setShowLogin(true)
            }}
          >
            {/* Subtle Gradient Glow on Hover - Logic for Interviewer Appeal */}
            <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none"
                style={{ background: `radial-gradient(circle at center, ${tool.bg.from}, transparent)` }}
            />

            <div className="relative z-10">
              {/* Icon Container with dynamic gradient */}
              <div 
                className="w-16 h-16 p-4 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-2xl"
                style={{
                  background: `linear-gradient(135deg, ${tool.bg.from}, ${tool.bg.to})`,
                }}
              >
                <tool.Icon className="w-full h-full text-white" />
              </div>

              <h3 className="mt-8 mb-3 text-xl font-bold text-white group-hover:text-purple-400 transition-colors">
                {tool.title}
              </h3>
              
              <p className="text-gray-400 text-sm leading-relaxed mb-8 group-hover:text-gray-300 transition-colors">
                {tool.description}
              </p>

              {/* Action Link */}
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-gray-500 group-hover:text-white transition-all">
                <span>Launch Tool</span>
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
              </div>
            </div>

            {/* Hidden subtle corner accent that appears on hover */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.div>
        ))} 
      </div>
    </motion.div>
  )
}

export default AiTools