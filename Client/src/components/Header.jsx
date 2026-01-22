import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { motion } from "framer-motion" // Use standard framer-motion
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import { Sparkles } from 'lucide-react'

const Header = () => {
  const { user, setShowLogin } = useContext(AppContext)
  const navigate = useNavigate()

  const onClickHandler = () => {
    if (user) navigate('/ai')
    else setShowLogin(true)
  }

  return (
    <motion.div 
      className="flex flex-col items-center text-center px-4 mt-16 sm:mt-24"
      initial={{ opacity: 0, y: 40 }} 
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      {/* Badge: Glassmorphic with subtle pulse */}
      <motion.div 
        className="flex items-center gap-2 bg-white/5 backdrop-blur-md px-5 py-2 rounded-full border border-white/10 shadow-2xl text-xs sm:text-sm text-purple-300 mb-6"
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Sparkles className="w-3.5 h-3.5" />
        <span className="font-semibold uppercase tracking-widest">The Future of Content Creation</span>
        <img src={assets.star_icon} className="w-4 h-4" alt="" />
      </motion.div>

      {/* Heading: High Contrast Gradient */}
      <motion.h1 
        className="text-4xl sm:text-7xl lg:text-8xl font-bold leading-[1.1] max-w-4xl tracking-tight"
        initial={{ opacity: 0, filter: "blur(10px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        transition={{ delay: 0.4, duration: 1 }}
      >
        Turn prompts into <br />
        <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          outcomes.
        </span>
      </motion.h1>

      {/* Subtext: Softer contrast for readability */}
      <motion.p 
        className="mt-6 text-base sm:text-xl text-gray-400 max-w-2xl leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 1 }}
      >
        Experience the power of OmniGen. Describe your creative vision and watch AI generate high-fidelity results in seconds.
      </motion.p>

      {/* Primary CTA: High-Contrast White Button */}
      <motion.button 
        onClick={onClickHandler}
        className="group mt-10 flex items-center gap-3 px-10 py-4 text-base sm:text-lg font-bold text-black rounded-2xl bg-white hover:bg-gray-100 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all duration-300 active:scale-95"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        Start Creating Now
        <img
          src={assets.star_group}
          alt=""
          className="h-5 sm:h-6 transition-transform duration-500 group-hover:rotate-[360deg]"
        />
      </motion.button>

      {/* Sample Showcase: Floating Animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className='flex flex-wrap justify-center mt-20 gap-4'
      >
        {Array(6).fill('').map((_, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -10, scale: 1.05 }}
            className="p-1.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm transition-all"
          >
            <img
              src={index % 2 === 0 ? assets.sample_img_1 : assets.sample_img_2}
              alt='Sample'
              className='rounded-xl cursor-pointer w-[60px] sm:w-[85px] h-[60px] sm:h-[85px] object-cover'
            />
          </motion.div>
        ))}
      </motion.div>

      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className='mt-6 text-sm font-medium text-gray-500 tracking-wide uppercase'
      >
        Powered by <span className="text-white">OmniGen AI</span>
      </motion.p>
    </motion.div>
  )
}

export default Header