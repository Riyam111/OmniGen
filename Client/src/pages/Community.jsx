import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { Heart, MessageSquare, Share2, Sparkles } from 'lucide-react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { motion, AnimatePresence } from 'framer-motion'

const backendUrl = import.meta.env.VITE_BACKEND_URL

const Community = () => {
  const [creations, setCreations] = useState([])
  const [loading, setLoading] = useState(false)
  const { token, user } = useContext(AppContext)

  const fetchCreations = async () => {
    if (creations.length === 0) setLoading(true)
    try {
      const { data } = await axios.get(backendUrl + '/api/user/get-published-creations', {
        headers: { token }
      })
      if (data.success) {
        setCreations(data.creations)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
    setLoading(false)
  }

  // OPTIMISTIC UPDATE: No full page reload
  const imageLikeToggle = async (id) => {
    if (!user) return toast.error("Please login to like")

    // 1. Immediately update UI locally
    setCreations(prev => prev.map(item => {
      if (item._id === id) {
        const isLiked = item.likes.some(likeId => String(likeId) === String(user.id));
        const newLikes = isLiked 
          ? item.likes.filter(likeId => String(likeId) !== String(user.id)) // Unlike
          : [...item.likes, user.id]; // Like
        return { ...item, likes: newLikes };
      }
      return item;
    }));

    // 2. Send request to backend in background
    try {
      const { data } = await axios.post(backendUrl + '/api/user/toggle-like-creation', { id }, {
        headers: { token }
      })
      if (!data.success) {
        fetchCreations(); // Revert to database state if server fails
        toast.error(data.message)
      }
    } catch (error) {
      fetchCreations(); // Revert on error
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (user) fetchCreations()
  }, [user])

  

  return (
    <div className="flex-1 h-full flex flex-col p-4 sm:p-8 overflow-y-auto custom-scrollbar">
      {/* Header Section */}
      
      <div className="flex flex-col mb-8">
        <div className="flex items-center gap-2 text-purple-400 mb-1">
          <Sparkles className="w-4 h-4" />
          <span className="text-xs font-bold uppercase tracking-[0.2em]">Community Showcase</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white">Recent Creations</h1>
      </div>

      {/* Masonry-style Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
        <AnimatePresence>
          {creations.map((creation, index) => (
            <motion.div
              key={creation._id || index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="relative group break-inside-avoid rounded-2xl overflow-hidden border border-white/10 glass-card"
            >
              <img
                src={creation.content}
                alt="AI Artwork"
                loading="lazy"
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Hover Overlay */}
             <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent 
    opacity-100 sm:opacity-0 sm:group-hover:opacity-100 
    transition-all duration-300 flex flex-col justify-end p-4 sm:p-5">
    
    {/* Prompt Text: Hidden on mobile to keep it clean, shown on desktop hover */}
    <p className="text-white text-xs sm:text-sm line-clamp-2 sm:line-clamp-3 mb-3 sm:mb-4 font-medium leading-relaxed italic hidden sm:block">
        "{creation.prompt}"
    </p>

    <div className="flex items-center justify-between border-t border-white/10 pt-3 sm:pt-4">
        <div className="flex items-center gap-4">
            <button 
                onClick={(e) => {
                    e.stopPropagation(); // Prevents accidental clicks
                    imageLikeToggle(creation._id);
                }}
                className="flex items-center gap-1.5"
            >
                <Heart
                    className={`w-5 h-5 transition-all active:scale-125 ${
                        user && creation.likes.some(likeId => String(likeId) === String(user.id))
                        ? "fill-red-500 text-red-500"
                        : "text-white"
                    }`}
                />
                <span className="text-xs font-bold text-white">{creation.likes.length}</span>
            </button>
            <Share2 className="w-4 h-4 text-white/70 active:text-white" />
        </div>
                  
                  
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default Community