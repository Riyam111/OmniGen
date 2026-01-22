import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import {
  Eraser,
  Hash,
  House,
  Image,
  Scissors,
  SquarePen,
  FileText,
  Users,
  LogOut,
} from "lucide-react";
import { NavLink } from "react-router-dom";
const navItems = [
  { to: "/ai", label: "Dashboard", Icon: House },
  { to: "/ai/write-article", label: "Write Article", Icon: SquarePen },
  { to: "/ai/blog-titles", label: "Blog Titles", Icon: Hash },
  { to: "/ai/result", label: "Generate Images", Icon: Image },
  { to: "/ai/remove-background", label: "Remove Background", Icon: Eraser },
  { to: "/ai/remove-object", label: "Remove Object", Icon: Scissors },
  { to: "/ai/review-resume", label: "Review Resume", Icon: FileText },
  { to: "/ai/community", label: "Community", Icon: Users },
];
const Sidebar = ({ sidebar, setSidebar }) => {
  const { user } = useContext(AppContext);
  
  return (
    <div className={`w-64 bg-black/20 backdrop-blur-xl border-r border-white/10 flex flex-col justify-between max-sm:absolute top-0 bottom-0 ${
        sidebar ? "translate-x-0" : "max-sm:-translate-x-full"
      } transition-all duration-300 ease-in-out z-50`} >
      
      <div className='my-7 w-full'>
       

        <div className="px-4 space-y-1">
          {navItems.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/ai"}
              onClick={() => setSidebar(false)}
              className={({ isActive }) =>
                `px-4 py-3 flex items-center gap-3 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? "bg-white/10 text-white shadow-[inset_0_0_10px_rgba(255,255,255,0.05)] border border-white/10"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon className={`w-5 h-5 transition-colors ${isActive ? "text-purple-400" : "group-hover:text-white"}`} />
                  <span className="font-medium text-sm">{label}</span>
                  {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-purple-400 shadow-[0_0_8px_#a855f7]"></div>}
                </>
              )}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Sidebar
