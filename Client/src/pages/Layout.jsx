import React, { useContext, useEffect, useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
import { Menu, X } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import AiNavbar from '../components/AiNavbar';

const Layout = () => {
  const navigate=useNavigate()
  const [sidebar, setSidebar] = useState(false);
  const {user,setShowLogin}=useContext(AppContext)
  useEffect(() => {
    const token = localStorage.getItem('token')

    if (!user && !token) {
      setShowLogin(true)
    } else {
      setShowLogin(false) // 🔥 CLOSE modal when user exists
    }
  }, [user])

  // 🚫 Block dashboard if not logged in
  if (!user) return null
  return  (
    // We change the bg to a dark slate and add a mesh gradient effect
    <div className="flex flex-col h-screen overflow-hidden bg-[#0a0a0c] text-white relative">
      <AiNavbar />
      
      {/* Dynamic Background Mesh (The "AI" Glow) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-blue-900/20 blur-[120px] rounded-full"></div>
      </div>

      <nav className="relative z-20 p-4 sm:hidden bg-black/20 backdrop-blur-md border-b border-white/5">
        {sidebar ? (
          <X onClick={() => setSidebar(false)} className="w-6 h-6 text-gray-300 cursor-pointer" />
        ) : (
          <Menu onClick={() => setSidebar(true)} className="w-6 h-6 text-gray-300 cursor-pointer" />
        )}
      </nav>

      <div className="flex flex-1 overflow-hidden relative z-10">
        {/* Your sidebar will need glassmorphism props too */}
        <Sidebar sidebar={sidebar} setSidebar={setSidebar} />

        <main className="flex-1 overflow-y-auto px-4 py-6 md:px-8 lg:px-12 custom-scrollbar">
          <div className="max-w-7xl mx-auto">
             <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

export default Layout
