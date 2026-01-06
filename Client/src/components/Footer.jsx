import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className="
      flex flex-col sm:flex-row
      items-center justify-between
      gap-6
      py-6 mt-20
      text-center
    ">
      
      {/* Logo */}
      <span className="
        flex items-center gap-2
        text-2xl sm:text-3xl
        font-extrabold tracking-tight
        cursor-pointer
      ">
        <span>🧠</span>
        <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Omni
        </span>
        <span className="text-gray-800">Gen</span>
      </span>

      {/* Copyright */}
      <p className="text-sm text-gray-500">
        © {new Date().getFullYear()} RiyaM.dev. All rights reserved.
      </p>

      {/* Social Icons */}
      <div className="flex gap-3">
        <img src={assets.facebook_icon} alt="Facebook" className="w-8 sm:w-9" />
        <img src={assets.twitter_icon} alt="Twitter" className="w-8 sm:w-9" />
        <img src={assets.instagram_icon} alt="Instagram" className="w-8 sm:w-9" />
      </div>

    </div>
  )
}


export default Footer
