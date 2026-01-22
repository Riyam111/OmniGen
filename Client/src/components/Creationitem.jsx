import React, { useState } from 'react'
import Markdown from 'react-markdown'
import { ChevronDown, ChevronUp, Image as ImageIcon, FileText, Calendar, Copy, Check } from 'lucide-react'

const Creationitem = ({ item }) => {
  const [expanded, setExpanded] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleCopy = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(item.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div 
      onClick={() => setExpanded(!expanded)} 
      className={`glass-card p-4 sm:p-5 transition-all duration-300 cursor-pointer group border-white/5 w-full ${
        expanded ? 'bg-white/10 ring-1 ring-purple-500/30' : 'hover:bg-white/5 hover:border-white/20'
      }`}
    >
      {/* Header Container - Column on Mobile, Row on Desktop */}
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        
        <div className="flex gap-3 sm:gap-4 w-full">
          {/* Icon - Smaller on Mobile */}
          <div className={`shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center border border-white/10 ${
            expanded ? 'bg-purple-500/20' : 'bg-white/5'
          }`}>
            {item.type === "image" ? (
              <ImageIcon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
            ) : (
              <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
            )}
          </div>

          <div className="min-w-0 flex-1">
            {/* Truncate text on mobile so it doesn't break the layout */}
            <h2 className={`text-sm sm:text-base font-medium transition-colors truncate sm:whitespace-normal ${
              expanded ? 'text-white' : 'text-gray-200'
            }`}>
              {item.prompt}
            </h2>
            <p className="text-[10px] sm:text-xs text-gray-500 mt-1 flex items-center gap-1 capitalize">
              <Calendar className="w-3 h-3" />
              {new Date(item.createdAt || item.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Action Buttons Container - Pushed to right on desktop, aligned left/between on mobile */}
        <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-3 pt-2 sm:pt-0 border-t border-white/5 sm:border-none">
          <div className="flex items-center gap-2">
            <button 
              onClick={handleCopy}
              className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/20 text-gray-400 hover:text-white transition-all"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
            
            <span className={`px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-wider border ${
              item.type === 'image' ? 'bg-blue-500/10 border-blue-500/30 text-blue-400' : 'bg-purple-500/10 border-purple-500/30 text-purple-400'
            }`}>
              {item.type}
            </span>
          </div>
          
          <div className="sm:ml-2">
            {expanded ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
          </div>
        </div>
      </div>

      {/* Expanded Content Area */}
      {expanded && (
        <div className="mt-4 pt-4 border-t border-white/10 animate-slide-down">
          {item.type === "image" ? (
            <div className="w-full flex justify-center">
              <img 
                src={item.content} 
                className="rounded-xl border border-white/10 w-full max-w-full h-auto object-contain" 
                alt="AI Generated"
              />
            </div>
          ) : (
            <div className="prose prose-invert prose-sm max-w-none text-gray-300 overflow-x-hidden">
              <Markdown>{item.content}</Markdown>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Creationitem