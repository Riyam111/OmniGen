import { Edit, Sparkles, Send, Copy, Check } from 'lucide-react'
import React, { useContext, useState } from 'react'
import Markdown from 'react-markdown';
import axios from 'axios'
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const backendUrl = import.meta.env.VITE_BACKEND_URL

const WriteArticle = () => {
    const articleLength = [
        { length: 800, text: "Short (500-800 words)" },
        { length: 1200, text: "Medium (800-1200 words)" },
        { length: 1600, text: "Long (1200+ words)" },
    ];

    const [selectedLength, setSelectedLength] = useState(articleLength[0]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState('');
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
            const prompt = `Write an article about ${input} in ${selectedLength.text}`
            const { data } = await axios.post(backendUrl + '/api/ai/generate-article', 
                { prompt, length: selectedLength.length },
                { headers: { token } }
            )
            if (data.success) {
                setContent(data.content)
                loadCreditsData()
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
            
            {/* Left Col: Configuration */}
            <form onSubmit={onSubmitHandler}
                className="glass-card w-full lg:max-w-md p-6 border-white/10 animate-slide-down">
                <div className="flex items-center gap-3 mb-8">
                    <div className="p-2 bg-blue-500/20 rounded-lg">
                        <Sparkles className="w-6 h-6 text-blue-400" />
                    </div>
                    <h1 className="text-xl font-bold text-white tracking-tight">Article Creator</h1>
                </div>

                <div className="space-y-6">
                    <div>
                        <label className="text-sm font-semibold text-gray-300 ml-1">Article Topic</label>
                        <textarea
                            onChange={(e) => setInput(e.target.value)}
                            value={input}
                            rows="3"
                            className="w-full p-4 mt-2 bg-white/5 border border-white/10 outline-none text-sm rounded-xl text-white placeholder:text-gray-600 focus:border-blue-500/50 transition-all resize-none"
                            placeholder="Describe the topic in detail..."
                            required
                        />
                    </div>

                    <div>
                        <label className="text-sm font-semibold text-gray-300 ml-1">Article Length</label>
                        <div className="mt-3 flex gap-2 flex-wrap">
                            {articleLength.map((item, index) => (
                                <button
                                    type="button"
                                    onClick={() => setSelectedLength(item)}
                                    key={index}
                                    className={`text-[11px] font-bold px-4 py-2 border rounded-full transition-all ${
                                        selectedLength.text === item.text
                                            ? "bg-blue-600 border-blue-500 text-white shadow-[0_0_15px_rgba(37,99,235,0.3)]"
                                            : "text-gray-400 border-white/10 bg-white/5 hover:bg-white/10"
                                    }`}
                                >
                                    {item.text}
                                </button>
                            ))}
                        </div>
                    </div>

                    <button disabled={loading} className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-4 mt-4 rounded-xl transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50">
                        {loading ? (
                            <span className='w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin'></span>
                        ) : (
                            <><Send className='w-4 h-4'/> Generate Article</>
                        )}
                    </button>
                </div>
            </form>

            {/* Right Col: Output */}
            <div className="glass-card w-full flex-1 p-6 border-white/10 flex flex-col min-h-[500px] max-h-[800px]">
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/10">
                    <div className="flex items-center gap-3">
                        <Edit className="w-5 h-5 text-blue-400" />
                        <h1 className="text-xl font-bold text-white tracking-tight">Generated Content</h1>
                    </div>
                    {content && (
                        <button 
                            onClick={handleCopy}
                            className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-all"
                        >
                            {copied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
                        </button>
                    )}
                </div>

                {!content ? (
                    <div className="flex-1 flex justify-center items-center">
                        <div className="flex flex-col items-center gap-4 text-gray-500 text-center max-w-xs">
                            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-2">
                                <Edit className="w-8 h-8 opacity-20" />
                            </div>
                            <p className="text-sm">Enter a topic on the left to start generating your high-quality article.</p>
                        </div>
                    </div>
                ) : (
                    <div className='flex-1 overflow-y-auto pr-2 custom-scrollbar'>
                        <div className='prose prose-invert prose-blue prose-sm max-w-none'>
                            <Markdown>{content}</Markdown>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default WriteArticle;