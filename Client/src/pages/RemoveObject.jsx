import { Scissors, Sparkles, Upload, Image as ImageIcon, Trash2, Download } from 'lucide-react';
import React, { useContext, useState } from 'react'
import axios from 'axios'
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const backendUrl = import.meta.env.VITE_BACKEND_URL

const RemoveObject = () => {
    const [file, setFile] = useState(null);
    const [object, setObject] = useState('')
    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState('')
    
    const { token, loadCreditsData } = useContext(AppContext)
    const navigate = useNavigate()

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            const wordCount = object.trim().split(/\s+/).length;
            if (wordCount > 1) {
                setLoading(false);
                return toast.error('Please enter only one object name');
            }

            const formData = new FormData()
            formData.append('image', file)
            formData.append('object', object)

            const { data } = await axios.post(backendUrl + '/api/image/remove-image-object', formData,
                { headers: { token } }
            )

            if (data.success) {
                setContent(data.imageUrl)
                loadCreditsData()
                toast.success("Object removed successfully!")
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
        <div className="h-full p-4 sm:p-6 lg:p-10 flex flex-col lg:flex-row items-start gap-6 overflow-y-auto">
            
            {/* Left Col: Editor Controls */}
            <form onSubmit={onSubmitHandler}
                className="glass-card w-full lg:max-w-md p-6 border-white/10 animate-slide-down">
                
                <div className="flex items-center gap-3 mb-8">
                    <div className="p-2 bg-blue-500/20 rounded-lg">
                        <Scissors className="w-6 h-6 text-[#417DF6]" />
                    </div>
                    <h1 className="text-xl font-bold text-white tracking-tight">Object Remover</h1>
                </div>

                <div className="space-y-6">
                    {/* Image Upload Area */}
                    <div>
                        <label className="text-sm font-semibold text-gray-300 ml-1">Source Image</label>
                        <div className={`mt-2 relative group border-2 border-dashed rounded-2xl transition-all h-48 flex flex-col items-center justify-center overflow-hidden ${
                            file ? 'border-blue-500/50 bg-blue-500/5' : 'border-white/10 bg-white/5 hover:border-white/20'
                        }`}>
                            <input 
                                onChange={(e) => setFile(e.target.files[0])}
                                accept='image/*'
                                type="file"
                                className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                required={!file}
                            />
                            {file ? (
                                <img src={URL.createObjectURL(file)} className="w-full h-full object-cover opacity-60" alt="Preview" />
                            ) : (
                                <div className="flex flex-col items-center text-center pointer-events-none p-4">
                                    <Upload className="w-8 h-8 text-gray-500 mb-2" />
                                    <p className="text-xs text-gray-400">Click to upload image</p>
                                </div>
                            )}
                            {file && (
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <p className="bg-black/60 px-3 py-1 rounded-full text-[10px] text-white backdrop-blur-md">Change Image</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Object Description */}
                    <div>
                        <label className="text-sm font-semibold text-gray-300 ml-1">Object to Remove</label>
                        <textarea 
                            onChange={(e) => setObject(e.target.value)} 
                            value={object}
                            rows={3} 
                            className='w-full p-4 mt-2 bg-white/5 border border-white/10 outline-none text-sm rounded-xl text-white placeholder:text-gray-600 focus:border-blue-500/50 transition-all resize-none'
                            placeholder='e.g., watch, bottle, person...' 
                            required 
                        />
                        <p className="text-[10px] text-gray-500 mt-2 flex items-center gap-1 italic">
                            <Sparkles className="w-3 h-3 text-blue-400" /> Use a single word for best results
                        </p>
                    </div>

                    <button 
                        disabled={loading} 
                        className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#417DF6] to-[#8E37EB] hover:brightness-110 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50"
                    >
                        {loading ? (
                            <span className='w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin'></span>
                        ) : (
                            <><Trash2 className='w-4 h-4'/> Erase Object</>
                        )}
                    </button>
                </div>
            </form>

            {/* Right Col: Preview */}
            <div className="glass-card w-full flex-1 p-6 border-white/10 flex flex-col min-h-[500px]">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                    <div className="flex items-center gap-3">
                        <ImageIcon className="w-5 h-5 text-[#417DF6]" />
                        <h1 className="text-xl font-bold text-white tracking-tight">Processed Result</h1>
                    </div>
                    
                </div>

                {!content ? (
                    <div className="flex-1 flex justify-center items-center">
                        <div className="flex flex-col items-center gap-4 text-gray-500 text-center max-w-xs">
                            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-2">
                                <Scissors className="w-8 h-8 opacity-20" />
                            </div>
                            <p className="text-sm">Your edited image will appear here after processing.</p>
                        </div>
                    </div>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center overflow-hidden rounded-xl bg-black/20 border border-white/5 relative group">
                        <img src={content} alt="Processed" className='max-w-full max-h-full object-contain shadow-2xl transition-transform duration-500 group-hover:scale-[1.01]' />
                        <div className="absolute top-4 right-4 bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-[10px] font-bold backdrop-blur-md border border-green-500/30">
                            AI PROCESSED
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default RemoveObject