import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { Menu, Star, LogOut, ChevronDown } from 'lucide-react'

const AiNavbar = ({ setSidebar }) => {
  const { user, logout, credit } = useContext(AppContext)
  const navigate = useNavigate()

  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-black/40 backdrop-blur-xl border-b border-white/10 z-50">
      
      {/* Left: Brand & Mobile Menu */}
      <div className="flex items-center gap-4">
        {/* Mobile Toggle Button */}
        

        <Link to="/" className="flex items-center gap-2 group transition-transform hover:scale-[1.02]">
          <span className="text-xl">🧠</span>
          <h1 className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Omni<span className="text-white">Gen</span>
          </h1>
        </Link>
      </div>

      {/* Right: Credits and Profile */}
      <div className="flex items-center gap-3 sm:gap-6">
        
        {/* Credits Pill with Dynamic Alert */}
<button 
  onClick={() => navigate('/buy')}
  className={`flex items-center gap-2 border transition-all duration-500 px-3 py-1.5 rounded-full group relative ${
    credit <= 1 
      ? 'bg-red-500/10 border-red-500/50 animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.2)]' 
      : 'bg-white/5 border-white/10 hover:bg-white/10'
  }`}
>
  {/* The Icon changes color based on credit count */}
  <div className={`w-5 h-5 rounded-full flex items-center justify-center shadow-lg transition-colors duration-500 ${
    credit <= 1 
      ? 'bg-gradient-to-tr from-orange-500 to-red-600' 
      : 'bg-gradient-to-tr from-blue-500 to-purple-500'
  }`}>
     <Star className={`w-3 h-3 text-white fill-white ${credit <= 1 ? 'animate-bounce' : 'group-hover:rotate-12'}`} />
  </div>

  <p className={`text-xs font-semibold transition-colors duration-500 ${
    credit <= 1 ? 'text-red-400' : 'text-gray-200'
  }`}>
    {credit <= 1 ? 'Low Credits:' : 'Credits:'} <span className={credit <= 1 ? 'text-white' : 'text-white'}>{credit}</span>
  </p>

  {/* Hidden "Top Up" tooltip that appears on hover when credits are low */}
  {credit <= 1 && (
    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-red-600 text-[10px] text-white px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
      Refill Now!
    </span>
  )}
</button>

        {/* User Profile Dropdown */}
        <div className="flex items-center gap-3 pl-4 border-l border-white/10 relative group">
          <div className="text-right hidden md:block">
            <p className="text-xs font-bold text-white leading-none">{user?.name}</p>
            {credit > 5 ? (
      <p className="text-[10px] text-purple-400 font-medium mt-1 flex items-center gap-1 justify-end">
        <span className="w-1 h-1 rounded-full bg-purple-400 animate-pulse"></span>
        Premium Member
      </p>
    ) : (
      <p className="text-[10px] text-gray-500 font-medium mt-1 uppercase tracking-tighter">
        Free Tier
      </p>
    )}
          </div>
          
          <div className="relative cursor-pointer">
            <img 
              className="w-9 h-9 rounded-full border-2 border-white/10 shadow-lg group-hover:border-purple-500/50 transition-colors" 
              src={assets.profile_icon} 
              alt="Profile" 
            />
            {/* Dropdown Menu */}
            <div className="absolute hidden group-hover:block top-full right-0 pt-3 animate-slide-down">
              <ul className="bg-[#1a1a1e] border border-white/10 rounded-xl p-2 shadow-2xl min-w-[140px]">
                <li 
                  onClick={logout} 
                  className="flex items-center gap-2 py-2.5 px-3 cursor-pointer text-gray-300 hover:text-white hover:bg-white/5 rounded-lg text-sm transition-colors"
                >
                  <LogOut className="w-4 h-4 text-red-400" />
                  Logout
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default AiNavbar