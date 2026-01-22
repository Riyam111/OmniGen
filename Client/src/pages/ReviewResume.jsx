import { FileText, Sparkles, Upload, CheckCircle, AlertCircle } from 'lucide-react';
import React, { useContext, useState } from 'react'
import axios from 'axios'
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import Markdown from 'react-markdown';
import { useNavigate } from 'react-router-dom';

const backendUrl = import.meta.env.VITE_BACKEND_URL

const ReviewResume = () => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState('');
    const { token, loadCreditsData } = useContext(AppContext)
    const navigate = useNavigate()

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        if (!file) return toast.error("Please upload a file first");

        try {
            setLoading(true)
            const formData = new FormData()
            formData.append('resume', file)

            const { data } = await axios.post(backendUrl + '/api/ai/resume-review', formData,
                { headers: { token } }
            )
            if (data.success) {
                setContent(data.content)
                loadCreditsData()
                toast.success("Analysis Complete!")
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
            
            {/* Left Col: Upload Area */}
            <form onSubmit={onSubmitHandler}
                className="glass-card w-full lg:max-w-md p-8 border-white/10 animate-slide-down">
                
                <div className="flex items-center gap-3 mb-8">
                    <div className="p-2 bg-emerald-500/20 rounded-lg">
                        <Sparkles className="w-6 h-6 text-[#00DA83]" />
                    </div>
                    <h1 className="text-xl font-bold text-white tracking-tight">Resume Review</h1>
                </div>

                <div className="space-y-6">
                    <div className="relative">
                        <label className="text-sm font-semibold text-gray-300 ml-1">Upload PDF Resume</label>
                        
                        {/* Custom Styled File Input Area */}
                        <div className={`mt-3 relative group border-2 border-dashed rounded-2xl transition-all flex flex-col items-center justify-center p-8 ${
                            file ? 'border-emerald-500/50 bg-emerald-500/5' : 'border-white/10 bg-white/5 hover:border-white/20'
                        }`}>
                            <input 
                                onChange={(e) => setFile(e.target.files[0])}
                                accept='application/pdf'
                                type="file"
                                className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                required
                            />
                            <div className="flex flex-col items-center text-center pointer-events-none">
                                {file ? (
                                    <>
                                        <CheckCircle className="w-10 h-10 text-emerald-400 mb-2" />
                                        <p className="text-sm text-white font-medium truncate max-w-[200px]">{file.name}</p>
                                        <p className="text-xs text-emerald-500/70 mt-1">File selected</p>
                                    </>
                                ) : (
                                    <>
                                        <Upload className="w-10 h-10 text-gray-500 group-hover:text-gray-400 mb-2 transition-colors" />
                                        <p className="text-sm text-gray-300 font-medium">Click or Drag & Drop</p>
                                        <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-wider">Supports: PDF only</p>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-start gap-2 px-2 py-3 bg-blue-500/5 rounded-xl border border-blue-500/10">
                        <AlertCircle className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                        <p className="text-[11px] text-blue-300/80 leading-relaxed">
                            Our AI will analyze your resume for ATS compatibility, keyword strength, and structure.
                        </p>
                    </div>

                    <button 
                        disabled={loading} 
                        className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#00DA83] to-[#009BB3] hover:brightness-110 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-emerald-500/10 disabled:opacity-50"
                    >
                        {loading ? (
                            <span className='w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin'></span>
                        ) : (
                            <><FileText className='w-4 h-4'/> Start Analysis</>
                        )}
                    </button>
                </div>
            </form>

            {/* Right Col: Output Analysis */}
            <div className="glass-card w-full flex-1 p-8 border-white/10 flex flex-col min-h-[500px] max-h-[85vh]">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                    <FileText className="w-5 h-5 text-[#00DA83]" />
                    <h1 className="text-xl font-bold text-white tracking-tight">Analysis Results</h1>
                </div>

                {!content ? (
                    <div className="flex-1 flex justify-center items-center">
                        <div className="flex flex-col items-center gap-4 text-gray-500 text-center max-w-xs">
                            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-2">
                                <FileText className="w-8 h-8 opacity-20" />
                            </div>
                            <p className="text-sm">Upload your resume to receive a detailed AI-driven performance review.</p>
                        </div>
                    </div>
                ) : (
                    <div className='flex-1 overflow-y-auto pr-4 custom-scrollbar'>
                        <div className='prose prose-invert prose-emerald prose-sm max-w-none'>
                            <Markdown>{content}</Markdown>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ReviewResume