import { Hash, Sparkles, Copy, Check, MousePointerClick } from 'lucide-react';
import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import Markdown from 'react-markdown';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const backendUrl = import.meta.env.VITE_BACKEND_URL

const BlogTitles = () => {
    const blogCategories = [
        'General', 'Technology', 'Business', 'Health', 'LifeStyle', 'Education',
        'Travel', 'Food'
    ]
    const [selectedCategory, setSelectedCategory] = useState('General');
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState('')
    const [copied, setCopied] = useState(false);

    const { token, loadCreditsData } = useContext(AppContext)
    const navigate = useNavigate()

    const handleCopy = () => {
        navigator.clipboard.writeText(content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            const prompt = `Generate 5 viral blog titles for the keyword "${input}" in the category "${selectedCategory}"`
            const { data } = await axios.post(backendUrl + '/api/ai/generate-blog-title', { prompt },
                { headers: { token } }
            )
            if (data.success) {
                setContent(data.content)
                loadCreditsData()
                toast.success("Titles Generated!")
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

            {/* Left Col: Configuration */}
            <form onSubmit={onSubmitHandler}
                className="glass-card w-full lg:max-w-md p-6 border-white/10 animate-slide-down">
                
                <div className="flex items-center gap-3 mb-8">
                    <div className="p-2 bg-purple-500/20 rounded-lg">
                        <Sparkles className="w-6 h-6 text-[#C341F6]" />
                    </div>
                    <h1 className="text-xl font-bold text-white tracking-tight">Title Generator</h1>
                </div>

                <div className="space-y-6">
                    <div>
                        <label className="text-sm font-semibold text-gray-300 ml-1">Main Keyword</label>
                        <input
                            onChange={(e) => setInput(e.target.value)}
                            value={input}
                            type="text"
                            className="w-full p-4 mt-2 bg-white/5 border border-white/10 outline-none text-sm rounded-xl text-white placeholder:text-gray-600 focus:border-purple-500/50 transition-all"
                            placeholder="e.g. Remote Work, Keto Diet..."
                            required
                        />
                    </div>

                    <div>
                        <label className="text-sm font-semibold text-gray-300 ml-1">Category</label>
                        <div className="mt-3 flex gap-2 flex-wrap">
                            {blogCategories.map((item) => (
                                <button
                                    type="button"
                                    onClick={() => setSelectedCategory(item)}
                                    key={item}
                                    className={`text-[11px] font-bold px-4 py-2 border rounded-full transition-all ${
                                        selectedCategory === item
                                            ? "bg-purple-600 border-purple-500 text-white shadow-[0_0_15px_rgba(195,65,246,0.3)]"
                                            : "text-gray-400 border-white/10 bg-white/5 hover:bg-white/10"
                                    }`}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>

                    <button disabled={loading} className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#C341F6] to-[#8E37EB] hover:brightness-110 text-white font-bold py-4 mt-4 rounded-xl transition-all shadow-lg shadow-purple-500/20 disabled:opacity-50">
                        {loading ? (
                            <span className='w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin'></span>
                        ) : (
                            <><Hash className='w-4 h-4' /> Generate Headlines</>
                        )}
                    </button>
                </div>
            </form>

            {/* Right Col: Output */}
            <div className="glass-card w-full flex-1 p-6 border-white/10 flex flex-col min-h-[500px]">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                    <div className="flex items-center gap-3">
                        <MousePointerClick className="w-5 h-5 text-purple-400" />
                        <h1 className="text-xl font-bold text-white tracking-tight">Viral Headlines</h1>
                    </div>
                    {content && (
                        <button 
                            onClick={handleCopy}
                            className="flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-xs text-gray-300 transition-all"
                        >
                            {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                            {copied ? 'Copied' : 'Copy All'}
                        </button>
                    )}
                </div>

                {!content ? (
                    <div className="flex-1 flex justify-center items-center">
                        <div className="flex flex-col items-center gap-4 text-gray-500 text-center max-w-xs">
                            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-2">
                                <Hash className="w-8 h-8 opacity-20" />
                            </div>
                            <p className="text-sm">Select a category and keyword to see high-converting blog titles.</p>
                        </div>
                    </div>
                ) : (
                    <div className='flex-1 overflow-y-auto pr-2 custom-scrollbar'>
                        <div className='prose prose-invert prose-purple prose-sm max-w-none'>
                            <Markdown>{content}</Markdown>
                        </div>
                        <div className="mt-8 p-4 bg-purple-500/5 rounded-xl border border-purple-500/10">
                            <p className="text-[10px] text-purple-400 font-bold uppercase tracking-widest mb-1">AI Tip</p>
                            <p className="text-xs text-gray-400 leading-relaxed">
                                Headlines with numbers or "How-to" formats usually perform 45% better in search results.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default BlogTitles