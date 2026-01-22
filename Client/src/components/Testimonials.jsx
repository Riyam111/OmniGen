import React from 'react'
import { assets, testimonialsData } from '../assets/assets'
import { motion } from "framer-motion"
import { Quote } from 'lucide-react'

const Testimonials = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }} 
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      className='flex flex-col items-center justify-center my-20 py-12 px-4'
    >
      {/* Title Section */}
      <div className="text-center mb-16">
        <h1 className='text-3xl sm:text-5xl font-bold mb-4 text-white'>
          Community Voices
        </h1>
        <p className='text-gray-400 max-w-md mx-auto'>
          Join thousands of creators who are already shaping the future with OmniGen.
        </p>
      </div>

      <div className='flex flex-wrap justify-center gap-8 max-w-7xl mx-auto'>
        {testimonialsData.map((testimonial, index) => (
          <motion.div 
            key={index}
            whileHover={{ y: -10 }}
            className='glass-card group relative p-8 w-full sm:w-80 cursor-pointer transition-all duration-500'
          >
            {/* Quote Icon Decoration */}
            <Quote className="absolute top-6 right-8 w-8 h-8 text-white/5 group-hover:text-purple-500/20 transition-colors" />

            <div className='flex flex-col items-center relative z-10'>
              {/* Profile Image with Gradient Ring */}
              <div className="p-1 rounded-full bg-gradient-to-tr from-purple-500/20 to-blue-500/20 group-hover:from-purple-500 group-hover:to-blue-500 transition-all duration-500">
                <img 
                  className='rounded-full w-16 h-16 object-cover border-2 border-[#0f1115]' 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                />
              </div>

              <h2 className='text-lg font-bold mt-4 text-white group-hover:text-purple-400 transition-colors'>
                {testimonial.name}
              </h2>
              <p className='text-xs font-medium text-purple-400/80 uppercase tracking-widest mb-4'>
                {testimonial.role}
              </p>

              {/* Star Ratings */}
              <div className='flex gap-1 mb-6'>
                {Array(testimonial.stars).fill().map((_, i) => (
                  <img key={i} src={assets.rating_star} alt="star" className="w-3.5 h-3.5" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className='text-center text-sm leading-relaxed text-gray-400 group-hover:text-gray-200 transition-colors'>
                "{testimonial.text}"
              </p>
            </div>

            {/* Bottom Glow Effect */}
            <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default Testimonials