import React, { useContext, useEffect, useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
import { Menu, X } from 'lucide-react';
import Sidebar from '../components/Sidebar';

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
    <div className="flex flex-col h-screen overflow-hidden">
     <nav  >
    
        {sidebar ? (
          <X
            onClick={() => setSidebar(false)}
            className="w-6 h-6 text-gray-600 sm:hidden"
          />
        ) : (
          <Menu
            onClick={() => setSidebar(true)}
            className="w-6 h-6 text-gray-600 sm:hidden"
          />
        )}
     </nav>
     <div className='flex flex-1 overflow-hidden'>
<Sidebar  sidebar={sidebar} setSidebar={setSidebar}/>

    
    <div className='flex-1 bg-[#F4F7FB] '>
       <Outlet/>
        </div>
    </div>
    </div>
  )
}

export default Layout
