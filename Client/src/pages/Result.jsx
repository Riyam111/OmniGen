import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { motion } from "framer-motion" // Changed from motion/react for standard compatibility
import { AppContext } from '../context/AppContext'
import { Sparkles, Download, RefreshCw, Globe } from 'lucide-react'

const Result = () => {
  const [image, setImage] = useState(assets.sample_img_1)
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState('')
  const { generateImage } = useContext(AppContext)
  const [publish, setPublish] = useState(false)

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    if (input) {
      const image = await generateImage(input, publish)
      if (image) {
        setIsImageLoaded(true)
        setImage(image)
      }
    }
    setLoading(false)
  }
  const downloadImage = async (e,url) => {
    e.preventDefault();
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const blobURL = window.URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = blobURL;
    link.download = `OmniGen_${Date.now()}.png`; // Set the filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(blobURL);
  } catch (error) {
    console.error("Download failed:", error);
    // Fallback: open in new tab if fetch fails
    window.open(url, '_blank');
  }
};

  return (
    <motion.form 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={onSubmitHandler} 
      className='flex flex-col min-h-[80vh] justify-center items-center px-4'
    >
      {/* Image Display Area */}
      <div className='relative group'>
        <div className='glass-card p-2 rounded-2xl overflow-hidden'>
          <img 
            src={image} 
            alt="Generated AI" 
            className='max-w-xs sm:max-w-sm rounded-xl transition-transform duration-500 group-hover:scale-[1.02]' 
          />
          
          {/* Progress Bar */}
          <span className={`absolute bottom-2 left-2 right-2 h-1.5 bg-purple-500 rounded-full transition-all 
            ${loading ? 'w-[calc(100%-16px)] duration-[10s] opacity-100' : 'w-0 opacity-0'}`} 
          />
        </div>
        
        {loading && (
          <div className='absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm rounded-2xl'>
            <RefreshCw className='w-10 h-10 text-purple-400 animate-spin mb-2' />
            <p className='text-sm font-medium text-white'>Dreaming up your image...</p>
          </div>
        )}
      </div>

      {!isImageLoaded ? (
        <div className='flex flex-col items-center gap-6 mt-10 w-full max-w-2xl'>
          {/* Input Area */}
          <div className='flex flex-col sm:flex-row w-full bg-white/5 border border-white/10 p-1.5 rounded-2xl sm:rounded-full focus-within:border-purple-500/50 transition-all gap-2 sm:gap-0'>
            <input
              onChange={e => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder='Describe what you want to generate...'
              className='flex-1 bg-transparent outline-none px-4 sm:px-6 py-3 text-white placeholder:text-gray-500 text-sm min-w-0' />
            <button 
              type='submit' 
              disabled={loading}
              className='bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white px-6 sm:px-10 py-2 sm:py-3 rounded-xl sm:rounded-full text-sm font-bold flex items-center gap-2 transition-all disabled:opacity-50'
            >
              {loading ? (
      <RefreshCw className="w-4 h-4 animate-spin" />
    ) : (
      <><Sparkles className='w-4 h-4 shrink-0' /> <span>Generate</span></>
    )}
            </button>
          </div>

          {/* Settings Area */}
          <div className="flex items-center gap-6 bg-white/5 px-6 py-3 rounded-2xl border border-white/5">
            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  id="publish-check"
                  checked={publish}
                  onChange={(e) => setPublish(e.target.checked)}
                  className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-white/20 bg-white/5 checked:bg-purple-600 checked:border-purple-600 transition-all"
                />
                <Globe className="absolute w-3 h-3 text-white left-1 pointer-events-none opacity-0 peer-checked:opacity-100" />
              </div>
              <label htmlFor="publish-check" className="text-sm text-gray-400 group-hover:text-gray-200 cursor-pointer transition-colors">
                Publish to community
              </label>
            </div>
          </div>
        </div>
      ) : (
        /* Action Buttons (Shows AFTER generation) */
        <div className="flex flex-col items-center mt-10 gap-6 w-full">
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              type="button"
              onClick={() => {
                setIsImageLoaded(false);
                setPublish(false);
                setInput('');
              }}
              className="glass-card px-8 py-3 rounded-full text-sm font-medium text-gray-200 hover:bg-white/10 flex items-center gap-2 transition-all"
            >
              <RefreshCw className="w-4 h-4" /> Generate Another
            </button>

            <button
            type='button'
  onClick={(e) => downloadImage(e,image)}
  className="bg-white text-black px-10 py-3 rounded-full text-sm font-bold flex items-center gap-2 hover:bg-gray-200 transition-all"
>
  <Download className="w-4 h-4" /> Download
</button>
          </div>
        </div>
      )}
    </motion.form>
  )
}

export default Result