import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import {Link, useNavigate} from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Navbar = () => {
  const {user,setShowLogin,logout,credit}=useContext(AppContext)
  
  const navigate=useNavigate()
  return (
       <div className="flex items-center py-4 justify-between">
        <Link to='/'>
      <span
        className="
          flex items-center gap-2
          text-2xl
          sm:text-3xl font-extrabold tracking-tight
          cursor-pointer
          transition-all duration-300
          hover:scale-[1.03]
        "
      >
        <span className="text-2xl">🧠</span>

        <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Omni
        </span>

        <span className="text-gray-800">
          Gen
        </span>
      </span>
</Link>
<div>
  {user?
  <div className='flex items-center gap-2 sm:gap-3'>
    <button onClick={() => navigate('/buy')}
              className="flex items-center gap-2 bg-indigo-50 hover:bg-indigo-100 px-3 sm:px-5 py-1.5 sm:py-2 rounded-full transition shadow-sm"
           >
      <img className='w-5 sm:w-5'src={assets.credit_star} alt=""/>
      <p className='text-xs sm:text-sm font-medium text-gray-600'>Credit left : {credit}</p>
    </button>
    <p className='text-gray-600 max-sm:hidden pl-4'>{user.name}</p>
    <div className='relative group'>
                    <img className='w-10 drop-shadow' src={assets.profile_icon} alt="" />

                    <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12'>
                        <ul className='list-none m-0 p-2 bg-white rounded-md border text-sm'>
                            <li onClick={logout} className='py-1 px-2 cursor-pointer pr-10 '>Logout</li>
                        </ul>
                    </div>
                </div>
    </div> :
    
    <div className='flex items-center gap-2 sm:gap-5'>
      <p onClick={()=>navigate('/buy')} className='cursor-pointer text-gray-600 hover:text-black'>Pricing</p>
      <button onClick={()=>setShowLogin(true)} className='bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-6 py-2 rounded-full text-sm shadow hover:scale-105 transition'>Login</button>
        </div> 
    }
  
</div>
    </div>
  )
}

export default Navbar
