import React, { useState, useEffect } from 'react'
import { assets } from '../assets/assets'
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, Zap, FileText, UserCheck, ChevronRight } from 'lucide-react'

const features = [
  {
    title: "Text-to-Image Engine",
    subtitle: "Innovation",
    description: "Easily bring your ideas to life with our AI image generator. Transforms your text into eye-catching visuals with neural processing.",
    quote: "From character designs to creative concepts, visualize anything effortlessly.",
    tags: ['Ultra HD', 'Neural Processing', 'Style Transfer'],
    image: assets.sample_img_1,
    icon: <Sparkles className="w-5 h-5" />
  },
  {
    title: "Article Generation",
    subtitle: "Creativity",
    description: "Generate SEO-optimized blog posts, newsletters, and marketing copy in seconds. Just provide a topic and let the AI handle the research.",
    quote: "Professional grade copy that sounds human, tailored to your brand voice.",
    tags: ['SEO Ready', 'Plagiarism Free', 'Multi-Language'],
    image: assets.aiarticle, 
    icon: <FileText className="w-5 h-5" />
  },
  {
    title: "AI Resume Review",
    subtitle: "Career Growth",
    description: "Get instant feedback on your resume. Our AI checks for keywords, formatting, and impact scores to help you land your dream job.",
    quote: "Beat the Applicant Tracking Systems (ATS) with data-driven insights.",
    tags: ['ATS Optimized', 'Impact Scoring', 'Smart Suggestions'],
    image: assets.airesume, // Swapped to a placeholder, use resume asset if available
    icon: <UserCheck className="w-5 h-5" />
  }
]

const Description = () => {
  const [activeIndex, setActiveIndex] = useState(0)

  // Auto-slide logic
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % features.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const activeFeature = features[activeIndex]

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      whileInView={{ opacity: 1 }}
      className='flex flex-col items-center justify-center my-24 p-6 md:px-28 min-h-[600px]'
    >
      {/* Title Section */}
      <div className="text-center mb-16">
        <h1 className='text-3xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent'>
          Create Beyond Limits
        </h1>
        {/* Progress Dots */}
        <div className="flex justify-center gap-2 mt-4">
          {features.map((_, i) => (
            <div 
              key={i} 
              onClick={() => setActiveIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${i === activeIndex ? 'w-8 bg-purple-500' : 'w-2 bg-white/10'}`} 
            />
          ))}
        </div>
      </div>

      <div className='flex flex-col gap-10 md:gap-20 md:flex-row items-center max-w-6xl'>
        
        {/* Left Side: Image with Animation */}
        <div className="relative group w-full flex justify-center md:justify-end">
          <AnimatePresence mode='wait'>
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
              <img 
  src={activeFeature.image} 
  alt={activeFeature.title} 
  className='relative w-80 xl:w-[500px] h-auto object-contain rounded-2xl border border-white/10 shadow-2xl bg-[#111217]' 
/>
              
              <div className="absolute -bottom-4 -right-4 bg-[#111217]/80 backdrop-blur-md px-4 py-2 rounded-xl flex items-center gap-2 border border-white/20">
                <Zap className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="text-xs font-bold text-white">AI Powered</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Side: Content */}
        <div className="w-full max-w-lg">
          <AnimatePresence mode='wait'>
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-2 mb-4 text-purple-400">
                {activeFeature.icon}
                <span className="text-sm font-bold uppercase tracking-widest">{activeFeature.subtitle}</span>
              </div>

              <h2 className='text-3xl sm:text-4xl font-bold text-white mb-6 leading-tight'>
                {activeFeature.title.split(' ').map((word, i) => 
                  i === activeFeature.title.split(' ').length - 1 
                  ? <span key={i} className="text-purple-500 font-mono"> {word}</span> 
                  : word + ' '
                )}
              </h2>

              <div className="space-y-6">
                <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                  {activeFeature.description}
                </p>

                <p className="text-sm sm:text-base text-gray-400 leading-relaxed border-l-2 border-purple-500/30 pl-6 italic">
                  "{activeFeature.quote}"
                </p>

                <div className="flex flex-wrap gap-3 pt-4">
                  {activeFeature.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] font-bold text-gray-300 uppercase">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          
          {/* Explore Button */}
          <button 
            onClick={() => setActiveIndex((activeIndex + 1) % features.length)}
            className="mt-10 flex items-center gap-2 text-sm font-bold text-white/50 hover:text-white transition-colors group"
          >
            Explore Next Tool <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default Description