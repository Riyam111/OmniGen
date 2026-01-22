import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { motion } from "framer-motion"
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import { Sparkles } from 'lucide-react'

const GenerateBtn = () => {
  const { user, setShowLogin } = useContext(AppContext)
  const navigate = useNavigate()

  const onClickHandler = () => {
    if (user) navigate('/ai')
    else setShowLogin(true)
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      viewport={{ once: true }}
      className="pb-24 text-center relative"
    >
      {/* 1. The "Background Aura" - Makes the section feel deep, not flat */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-600/20 blur-[120px] rounded-full pointer-events-none" />

      {/* 2. The Typography - Minimalist and sharp */}
      <h1 className="text-3xl md:text-5xl font-bold text-white mb-10 tracking-tight leading-tight">
        See the magic. <br /> 
        <span className="text-gray-500">Try OmniGen now.</span>
      </h1>

      {/* 3. The "Glass Action" Button */}
      <motion.button 
        onClick={onClickHandler}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        className="
          relative group
          inline-flex items-center gap-3
          px-10 py-4
          rounded-2xl
          bg-white text-black
          font-bold text-lg
          transition-all duration-300
          hover:shadow-[0_0_40px_rgba(255,255,255,0.25)]
        "
      >
        {/* Subtle internal glow on hover */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-400/0 via-purple-400/20 to-blue-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <span className="relative z-10">Start Creating</span>
        <Sparkles className="relative z-10 w-5 h-5 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110" />
      </motion.button>

      {/* 4. Sub-logic: Proof of work */}
      <div className="mt-12 flex flex-col items-center gap-4">
        <div className="flex -space-x-3">
          {[1,2,3,4].map((i) => (
             <div key={i} className="w-8 h-8 rounded-full border-2 border-[#050505] bg-gray-800 overflow-hidden">
                <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="user" />
             </div>
          ))}
          <div className="w-8 h-8 rounded-full border-2 border-[#050505] bg-purple-600 flex items-center justify-center text-[10px] font-bold">
            +2k
          </div>
        </div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
          Joined by creators worldwide
        </p>
      </div>
    </motion.div>
  )
}

export default GenerateBtn