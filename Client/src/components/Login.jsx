import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { motion } from "motion/react"
import axios from 'axios'
import { toast } from 'react-toastify'
 
const Login = () => {
  const [state, setState] = useState('Login')
  const { setShowLogin,backendUrl,setToken ,setUser} = useContext(AppContext)
  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')

  const onSubmitHandler=async(e)=>{
e.preventDefault();
try {
  if(state==='Login'){
  const {data}=  await axios.post(backendUrl+'/api/user/login',{email,password})
if(data.success){
setToken(data.token)
setUser(data.user)
localStorage.setItem('token',data.token)
setShowLogin(false)
toast.success('user login successfully')
}
else{
toast.error(data.message)
}
  }
  else{
   const {data}=  await axios.post(backendUrl+'/api/user/register',{name,email,password})
if(data.success){
setToken(data.token)
setUser(data.user)
localStorage.setItem('token',data.token)
setShowLogin(false) 
  }
  else{
    toast.error(data.message)
  }
}} catch (error) {
   toast.error(error.message)
}
  }
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  return (
    <div
    
    
    className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4">
      
      <motion.form 
      onSubmit={onSubmitHandler}
        initial={{opacity:0.2,y:50}} transition={{duration:0.3}}
    whileInView={{opacity:1,y:0}}
    viewport={{once:true}}
      
      
      className="relative w-full max-w-md bg-white rounded-2xl shadow-xl p-8 sm:p-10">
        
        {/* Close button */}
        <img
          onClick={() => setShowLogin(false)}
          src={assets.cross_icon}
          alt="close"
          className="absolute top-4 right-4 w-5 cursor-pointer opacity-70 hover:opacity-100"
        />

        {/* Heading */}
        <h1 className="text-center text-2xl font-semibold text-gray-800">
          {state}
        </h1>
        <p className="text-center text-sm text-gray-500 mt-1">
          Welcome back! Please sign in to continue
        </p>

        {/* Full name (signup only) */}
        {state !== 'Login' && (
          <div className="mt-6 flex items-center gap-3 border rounded-lg px-4 py-2 focus-within:border-blue-500">
            <img className="w-5" src={assets.profile_icon} alt="" />
            <input
            onChange={e=>setName(e.target.value)} value={name}
              type="text"
              placeholder="Full Name"
              className="w-full outline-none text-sm"
              required
            />
          </div>
        )}

        {/* Email */}
        <div className="mt-4 flex items-center gap-3 border rounded-lg px-4 py-2 focus-within:border-blue-500">
          <img className="w-5" src={assets.email_icon} alt="" />
          <input
          onChange={e=>setEmail(e.target.value)} value={email}
            type="email"
            placeholder="Email address"
            className="w-full outline-none text-sm"
            required
          />
        </div>

        {/* Password */}
        <div className="mt-4 flex items-center gap-3 border rounded-lg px-4 py-2 focus-within:border-blue-500">
          <img className="w-5" src={assets.lock_icon} alt="" />
          <input
          onChange={e=>setPassword(e.target.value)} value={password}
            type="password"
            placeholder="Password"
            className="w-full outline-none text-sm"
            required
          />
        </div>

        {/* Forgot password */}
        <p className="text-right text-sm text-blue-600 mt-3 cursor-pointer hover:underline">
          Forgot password?
        </p>

        {/* Button */}
        <button className="mt-5 w-full bg-blue-600 hover:bg-blue-700 transition text-white py-2.5 rounded-lg font-medium">
          {state === 'Login' ? 'Login' : 'Create account'}
        </button>

        {/* Toggle login/signup */}
        {state === 'Login' ? (
          <p className="mt-6 text-center text-sm">
            Don’t have an account?{' '}
            <span
              className="text-blue-600 cursor-pointer hover:underline"
              onClick={() => setState('Sign Up')}
            >
              Sign up
            </span>
          </p>
        ) : (
          <p className="mt-6 text-center text-sm">
            Already have an account?{' '}
            <span
              className="text-blue-600 cursor-pointer hover:underline"
              onClick={() => setState('Login')}
            >
              Login
            </span>
          </p>
        )}
      </motion.form>
    </div>
  )
}

export default Login
