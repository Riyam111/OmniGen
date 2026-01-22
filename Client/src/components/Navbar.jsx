import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { LogOut, CreditCard, Menu, X, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const Navbar = () => {
  const { user, setShowLogin, logout, credit } = useContext(AppContext)
  const navigate = useNavigate()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleNavClick = (path) => {
    navigate(path)
    setIsMobileMenuOpen(false)
  }

  return (
    <nav className="sticky top-0 z-50 w-full px-4 sm:px-6 py-4">
      {/* Main Bar */}
      <div className="max-w-7xl mx-auto flex items-center justify-between px-5 py-3 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl relative">
        
        {/* Logo */}
        <Link to='/' onClick={() => setIsMobileMenuOpen(false)}>
          <span className="flex items-center gap-2 text-xl sm:text-2xl font-extrabold tracking-tight">
            <span className="text-2xl">🧠</span>
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Omni</span>
            <span className="text-white">Gen</span>
          </span>
        </Link>

        <div className="flex items-center gap-3 sm:gap-6">
          {user && (
            <button 
              onClick={() => navigate('/buy')}
              className="flex items-center gap-2 bg-white/10 border border-white/10 px-3 py-2 rounded-xl transition-all"
            >
              <img className='w-4' src={assets.credit_star} alt="credits"/>
              <p className='text-[11px] sm:text-sm font-semibold text-gray-200'>{credit}</p>
            </button>
          )}

          {/* Desktop Login/Profile (Hidden on Mobile) */}
          <div className="hidden sm:block">
            {user ? (
               <div className='relative group'>
                  <img className='w-9 h-9 rounded-full border-2 border-purple-500 cursor-pointer' src={assets.profile_icon} alt="profile" />
                  <div className='absolute hidden group-hover:block top-full right-0 pt-3 z-50'>
                    <ul className='min-w-[160px] bg-[#1a1c22] border border-white/10 p-2 rounded-xl shadow-2xl text-sm text-gray-300'>
                      <li onClick={() => navigate('/buy')} className='flex items-center gap-2 py-2.5 px-3 hover:bg-white/5 cursor-pointer rounded-lg'><CreditCard size={16}/> Buy Credits</li>
                      <li onClick={logout} className='flex items-center gap-2 py-2.5 px-3 hover:bg-red-500/10 hover:text-red-400 cursor-pointer rounded-lg border-t border-white/5 mt-1'><LogOut size={16}/> Logout</li>
                    </ul>
                  </div>
               </div>
            ) : (
              <button onClick={() => setShowLogin(true)} className='bg-white text-black font-bold px-7 py-2.5 rounded-xl text-sm hover:bg-gray-200 transition-all'>Login</button>
            )}
          </div>

          {/* Hamburger Toggle */}
          <button 
            className="sm:hidden p-2 text-white bg-white/5 rounded-lg border border-white/10"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE SIDEBAR (Using AnimatePresence to prevent layout breaking) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop Layer */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[51] sm:hidden"
            />

            {/* Side Menu */}
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[280px] bg-[#0f1115] border-l border-white/10 z-[52] p-8 shadow-2xl sm:hidden"
            >
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-center mb-10">
                   <span className="text-xl font-bold text-white">Menu</span>
                   <button onClick={() => setIsMobileMenuOpen(false)} className="text-gray-400"><X /></button>
                </div>

                {!user ? (
                  <div className="flex flex-col gap-6">
                    <button onClick={() => {setShowLogin(true); setIsMobileMenuOpen(false)}} className="w-full bg-white text-black font-bold py-4 rounded-xl">Login / Sign Up</button>
                    <button onClick={() => handleNavClick('/buy')} className="text-gray-400 text-left px-2">Pricing</button>
                  </div>
                ) : (
                  <div className="flex flex-col h-full">
                    <div className="flex items-center gap-4 mb-8 p-4 bg-white/5 rounded-2xl">
                      <img className='w-12 h-12 rounded-full border-2 border-purple-500' src={assets.profile_icon} alt="" />
                      <div>
                        <p className="text-white font-bold truncate w-32">{user.name}</p>
                        <p className="text-purple-400 text-xs font-mono">{credit} Credits</p>
                      </div>
                    </div>

                    <nav className="flex flex-col gap-2">
                      <button onClick={() => handleNavClick('/buy')} className="flex items-center gap-3 text-gray-300 p-4 hover:bg-white/5 rounded-xl transition-all">
                        <CreditCard size={20}/> Buy Credits
                      </button>
                      <button onClick={() => {logout(); setIsMobileMenuOpen(false)}} className="flex items-center gap-3 text-red-400 p-4 hover:bg-red-500/5 rounded-xl transition-all mt-auto mb-10">
                        <LogOut size={20}/> Logout
                      </button>
                    </nav>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar