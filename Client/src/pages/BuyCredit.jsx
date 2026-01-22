import React, { useContext } from 'react'
import { assets, plans } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { motion } from "framer-motion"
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import { Check, Zap } from 'lucide-react'

const BuyCredit = () => {
  const { user, backendUrl, loadCreditsData, token, setShowLogin } = useContext(AppContext)
  const navigate = useNavigate()

  const initPay = async (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'OmniGen Credits',
      description: 'Purchase AI Generation Credits',
      order_id: order.id,
      handler: async (response) => {
        try {
          const { data } = await axios.post(backendUrl + '/api/user/verify-razor', response, {
            headers: { token }
          })
          if (data.success) {
            loadCreditsData();
            navigate('/')
            toast.success('Transaction Successful! Credits added.')
          }
        } catch (error) {
          toast.error(error.message)
        }
      },
      theme: { color: "#8b5cf6" } 
    }
    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  const paymentRazorpay = async (planId) => {
    try {
      if (!user) {
        setShowLogin(true)
        return;
      }
      const { data } = await axios.post(backendUrl + '/api/user/pay-razor', { planId }, {
        headers: { token }
      })
      if (data.success) {
        initPay(data.order)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    /* We use 'bg-[#050505]' to force the dark background and 'min-h-screen' to fill the page */
    <div className='w-full bg-[#050505] min-h-screen'>
      <motion.div 
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className='max-w-7xl mx-auto text-center pt-20 pb-20 px-6'
      >
        <button className='border border-white/10 bg-white/5 text-purple-400 text-[10px] font-bold tracking-[0.3em] uppercase px-8 py-2 rounded-full mb-6'>
          Pricing Options
        </button>
        
        <h1 className='text-4xl sm:text-6xl font-bold mb-6 text-white'>
          Ready to <span className="bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent">Scale?</span>
        </h1>
        <p className='text-gray-500 mb-16 max-w-lg mx-auto text-sm sm:text-base leading-relaxed'>
          Choose the perfect plan for your creative journey. All packs include high-priority generation and lifetime access.
        </p>

        {/* The Grid - This holds your 3 cards */}
        <div className='flex flex-wrap justify-center gap-10'>
          {plans.map((item, index) => (
            <motion.div 
              key={index} 
              whileHover={{ y: -12, borderColor: 'rgba(139, 92, 246, 0.5)' }}
              className={`relative bg-[#0d0e12] border border-white/5 rounded-[2.5rem] py-12 px-8 text-white w-full sm:w-[350px] transition-all duration-500 shadow-2xl
                ${index === 1 ? 'border-purple-500/30 ring-1 ring-purple-500/20' : ''}`}
            >
              {/* Featured Badge for the middle card */}
              {index === 1 && (
                <div className="absolute top-6 right-8 bg-gradient-to-r from-purple-600 to-blue-600 text-[10px] font-black uppercase px-4 py-1.5 rounded-full shadow-lg">
                  Popular Choice
                </div>
              )}

              <div className="mb-8">
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-6">
                   <Zap className={`w-7 h-7 ${index === 2 ? 'text-yellow-400' : 'text-purple-500'}`} />
                </div>
                <h3 className='text-2xl font-bold'>{item.id}</h3>
                <p className='text-gray-500 text-sm mt-2'>{item.desc}</p>
              </div>
              
              <div className='mb-10'>
                 <span className='text-5xl font-bold'>${item.price}</span>
                 <span className='text-gray-500 text-sm ml-2 font-mono'>/ {item.credits} Credits</span>
              </div>

              {/* Feature List */}
              <div className="space-y-4 mb-10">
                 {['Fast AI Processing', 'Commercial License', 'Priority Queue'].map((feature) => (
                   <div key={feature} className="flex items-center gap-3 text-sm text-gray-400">
                      <div className="p-0.5 bg-green-500/20 rounded-full">
                        <Check className="w-3.5 h-3.5 text-green-500" />
                      </div>
                      {feature}
                   </div>
                 ))}
              </div>

              <button 
                onClick={() => paymentRazorpay(item.id)} 
                className={`w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all duration-300 active:scale-95 shadow-xl
                  ${index === 1 
                    ? 'bg-white text-black hover:bg-gray-100' 
                    : 'bg-white/5 border border-white/10 hover:bg-white/10 text-white'
                  }`}
              >
                {user ? 'Purchase Plan' : 'Get Started'}
              </button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default BuyCredit