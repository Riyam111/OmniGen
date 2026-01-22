import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { motion } from "framer-motion"
import axios from 'axios'
import { toast } from 'react-toastify'
import { User, Mail, Lock, X } from 'lucide-react'

const Login = () => {
  const [state, setState] = useState('Login')
  const { setShowLogin, backendUrl, setToken, setUser } = useContext(AppContext)
  
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (state === 'Login') {
        const { data } = await axios.post(backendUrl + '/api/user/login', { email, password })
        if (data.success) {
          setToken(data.token)
          setUser(data.user)
          localStorage.setItem('token', data.token)
          setShowLogin(false)
          toast.success('Logged in successfully')
        } else {
          toast.error(data.message)
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/user/register', { name, email, password })
        if (data.success) {
          setToken(data.token)
          setUser(data.user)
          localStorage.setItem('token', data.token)
          setShowLogin(false)
          toast.success('Account created!')
        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
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
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md flex items-center justify-center px-4">
      
      <motion.form 
        onSubmit={onSubmitHandler}
        initial={{ opacity: 0, scale: 0.9, y: 20 }} 
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="relative w-full max-w-md bg-[#111217] border border-white/10 rounded-[2.5rem] shadow-2xl p-8 sm:p-12 overflow-hidden"
      >
        {/* Background Decorative Glow */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-purple-600/20 blur-[80px] rounded-full pointer-events-none" />
        
        {/* Close button */}
        <button 
          type="button"
          onClick={() => setShowLogin(false)}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/5 transition-colors group"
        >
          <X className="w-5 h-5 text-gray-500 group-hover:text-white" />
        </button>

        {/* Heading */}
        <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white tracking-tight">
            {state}
            </h1>
            <p className="text-sm text-gray-400 mt-2">
            {state === 'Login' ? 'Welcome back! Sign in to your account' : 'Join us to start creating magic'}
            </p>
        </div>

        <div className="space-y-4">
            {/* Full name (signup only) */}
            {state !== 'Login' && (
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-4 py-3.5 focus-within:border-purple-500/50 transition-all">
                <User className="w-5 h-5 text-gray-500" />
                <input
                onChange={e => setName(e.target.value)} value={name}
                type="text"
                placeholder="Full Name"
                className="w-full bg-transparent outline-none text-sm text-white placeholder:text-gray-600"
                required
                />
            </div>
            )}

            {/* Email */}
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-4 py-3.5 focus-within:border-purple-500/50 transition-all">
            <Mail className="w-5 h-5 text-gray-500" />
            <input
                onChange={e => setEmail(e.target.value)} value={email}
                type="email"
                placeholder="Email address"
                className="w-full bg-transparent outline-none text-sm text-white placeholder:text-gray-600"
                required
            />
            </div>

            {/* Password */}
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-4 py-3.5 focus-within:border-purple-500/50 transition-all">
            <Lock className="w-5 h-5 text-gray-500" />
            <input
                onChange={e => setPassword(e.target.value)} value={password}
                type="password"
                placeholder="Password"
                className="w-full bg-transparent outline-none text-sm text-white placeholder:text-gray-600"
                required
            />
            </div>
        </div>

        {state === 'Login' && (
          <p className="text-right text-xs text-purple-400 mt-3 cursor-pointer hover:text-purple-300 transition-colors">
            Forgot password?
          </p>
        )}

        {/* Submit Button */}
        <button className="mt-8 w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-[0_10px_20px_rgba(139,92,246,0.3)] transition-all text-white py-3.5 rounded-2xl font-bold active:scale-95">
          {state === 'Login' ? 'Login' : 'Create Account'}
        </button>

        {/* Toggle login/signup */}
        <p className="mt-8 text-center text-sm text-gray-500">
          {state === 'Login' ? "Don't have an account?" : "Already have an account?"}{' '}
          <span
            className="text-white font-semibold cursor-pointer hover:underline decoration-purple-500 underline-offset-4"
            onClick={() => setState(state === 'Login' ? 'Sign Up' : 'Login')}
          >
            {state === 'Login' ? 'Sign up' : 'Login'}
          </span>
        </p>
      </motion.form>
    </div>
  )
}

export default Login