import { Eraser, Sparkles, Upload, Image as ImageIcon, Download, Layers } from 'lucide-react';
import React, { useContext, useState } from 'react'
import axios from 'axios'
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const backendUrl = import.meta.env.VITE_BACKEND_URL

const RemoveBackground = () => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState('')
    const { token, loadCreditsData } = useContext(AppContext)
    const navigate = useNavigate()

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            const formData = new FormData()
            formData.append('image', file)

            const { data } = await axios.post(backendUrl + '/api/image/remove-image-background', formData,
                { headers: { token } }
            )
            if (data.success) {
                setContent(data.secure_url)
                loadCreditsData()
                toast.success("Background removed!")
            } else {
                toast.error(data.message)
                loadCreditsData()
                if (data.creditBalance === 0) navigate('/buy')
            }
        } catch (error) {
            toast.error(error.message)
        }
        setLoading(false)
    }

    return (
        <div className="h-full p-4 sm:p-6 lg:p-10 flex flex-col lg:flex-row items-start gap-6 overflow-y-auto custom-scrollbar">
            
            {/* Left Col: Upload Configuration */}
            <form onSubmit={onSubmitHandler}
                className="glass-card w-full lg:max-w-md p-6 border-white/10 animate-slide-down">
                
                <div className="flex items-center gap-3 mb-8">
                    <div className="p-2 bg-orange-500/20 rounded-lg">
                        <Sparkles className="w-6 h-6 text-[#FF4938]" />
                    </div>
                    <h1 className="text-xl font-bold text-white tracking-tight">Background Remover</h1>
                </div>

                <div className="space-y-6">
                    <div>
                        <label className="text-sm font-semibold text-gray-300 ml-1">Source Image</label>
                        <div className={`mt-2 relative group border-2 border-dashed rounded-2xl transition-all h-56 flex flex-col items-center justify-center overflow-hidden ${
                            file ? 'border-orange-500/50 bg-orange-500/5' : 'border-white/10 bg-white/5 hover:border-white/20'
                        }`}>
                            <input 
                                onChange={(e) => setFile(e.target.files[0])}
                                accept='image/*'
                                type="file"
                                className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                required
                            />
                            {file ? (
                                <div className="w-full h-full relative">
                                    <img src={URL.createObjectURL(file)} className="w-full h-full object-cover" alt="Preview" />
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <p className="text-xs text-white font-medium bg-black/60 px-4 py-2 rounded-full backdrop-blur-md">Change Photo</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center text-center pointer-events-none p-4">
                                    <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-3">
                                        <Upload className="w-6 h-6 text-gray-400" />
                                    </div>
                                    <p className="text-sm text-gray-300 font-medium">Click or Drag Image</p>
                                    <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-widest">JPG, PNG up to 10MB</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="p-4 bg-orange-500/5 border border-orange-500/10 rounded-xl">
                        <div className="flex items-center gap-2 mb-1">
                            <Layers className="w-3.5 h-3.5 text-orange-400" />
                            <p className="text-[11px] font-bold text-orange-400 uppercase tracking-wider">AI Accuracy</p>
                        </div>
                        <p className="text-[11px] text-gray-400 leading-relaxed">
                            Our neural network automatically detects subjects and creates a precise transparency mask.
                        </p>
                    </div>

                    <button 
                        disabled={loading || !file} 
                        className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#F6AB41] to-[#FF4938] hover:brightness-110 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-orange-500/20 disabled:opacity-50"
                    >
                        {loading ? (
                            <span className='w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin'></span>
                        ) : (
                            <><Eraser className='w-4 h-4'/> Remove Background</>
                        )}
                    </button>
                </div>
            </form>

            {/* Right Col: Processed Result */}
            <div className="glass-card w-full flex-1 p-6 border-white/10 flex flex-col min-h-[500px]">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                    <div className="flex items-center gap-3">
                        <ImageIcon className="w-5 h-5 text-[#FF4938]" />
                        <h1 className="text-xl font-bold text-white tracking-tight">Cutout Result</h1>
                    </div>
                   
                </div>

                {!content ? (
                    <div className="flex-1 flex justify-center items-center border border-white/5 rounded-2xl bg-white/[0.02]">
                        <div className="flex flex-col items-center gap-4 text-gray-500 text-center max-w-xs">
                            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-2">
                                <Eraser className="w-8 h-8 opacity-20" />
                            </div>
                            <p className="text-sm">Processed transparency will be displayed here.</p>
                        </div>
                    </div>
                ) : (
                    /* The "Checkerboard" transparency container */
                    <div className="flex-1 flex items-center justify-center rounded-2xl overflow-hidden relative min-h-[400px]" 
                         style={{ backgroundImage: 'conic-gradient(#222 90deg, #1a1a1a 90deg 180deg, #222 180deg 270deg, #1a1a1a 270deg)', backgroundSize: '20px 20px' }}>
                        <img 
                            src={content} 
                            alt="Transparency Result" 
                            className='max-w-full max-h-full object-contain drop-shadow-2xl animate-fade-in' 
                        />
                        <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-md border border-white/10 text-[10px] text-gray-300">
                            Transparent PNG
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default RemoveBackground