import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <footer className="
      flex flex-col sm:flex-row
      items-center justify-between
      gap-8
      py-10 mt-20
      border-t border-white/5
      px-4 sm:px-10
    ">
      
      {/* Logo Section */}
      <div className="flex items-center gap-2 group cursor-pointer">
        <span className="text-2xl group-hover:rotate-12 transition-transform duration-300">🧠</span>
        <span className="text-xl sm:text-2xl font-bold tracking-tight">
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Omni
          </span>
          <span className="text-white ml-0.5">Gen</span>
        </span>
      </div>

      {/* Copyright */}
      <p className="text-xs sm:text-sm text-gray-500 font-medium tracking-wide order-3 sm:order-2">
        © {new Date().getFullYear()} <span className="text-gray-300 hover:text-purple-400 transition-colors cursor-pointer">RiyaM.dev</span>. All rights reserved.
      </p>

      {/* Social Icons - Fixed Visibility */}
      <div className="flex gap-4 order-2 sm:order-3">
        {[
          { icon: assets.facebook_icon, label: 'Facebook' },
          { icon: assets.twitter_icon, label: 'Twitter' },
          { icon: assets.instagram_icon, label: 'Instagram' }
        ].map((social, index) => (
          <div 
            key={index}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-white/20 hover:border-purple-500/50 hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
          >
            <img 
              src={social.icon} 
              alt={social.label} 
              className="w-5 brightness-0 invert opacity-60 group-hover:opacity-100 transition-all duration-300" 
            />
          </div>
        ))}
      </div>

    </footer>
  )
}

export default Footer