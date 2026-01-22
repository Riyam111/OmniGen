import React, { useContext, useEffect, useState } from 'react'
import { dummyCreationData } from '../assets/assets'
import { Sparkles } from 'lucide-react'
import Creationitem from '../components/Creationitem'
import axios from 'axios'
import { toast } from 'react-toastify'
import { AppContext } from '../context/AppContext'
const backendUrl=import.meta.env.VITE_BACKEND_URL
const Dashboard = () => {
  const [creations,setCreations]=useState([])
   const [loading, setLoading] = useState(true);
   const {token}=useContext(AppContext)
  const getDashboardData=async()=>{
   try {
     const {data}=await axios.get(backendUrl+'/api/user/get-user-creations',
      {headers:{token}}
    )
    if(data.success){
         setCreations(data.creations)
       }
       else{
         toast.error(data.message)
       }
       } catch (error) {
         toast.error(error.message)
       }
       setLoading(false)
  }
  useEffect(()=>{
getDashboardData()
  },[])
  return (
    <div  className="w-full h-full overflow-y-auto p-6">
      <div className="flex gap-4 flex-wrap">
  {/* Updated Stats Card */}
  <div className="glass-card flex justify-between items-center w-72 p-5 px-6 relative overflow-hidden group transition-all duration-300 hover:border-white/20">
    
    {/* Subtle Inner Glow */}
    <div className="absolute -right-4 -top-4 w-20 h-20 bg-blue-500/10 blur-2xl rounded-full group-hover:bg-blue-500/20 transition-all duration-500"></div>
    
    <div className="relative z-10">
      <p className="text-gray-400 text-xs uppercase tracking-widest font-semibold">Total Creations</p>
      <h2 className="text-3xl font-bold mt-1 text-white tracking-tight">{creations.length}</h2>
    </div>

    <div className="relative z-10 w-12 h-12 rounded-xl bg-gradient-to-br from-[#cd26d9] to-[#0BB0D7] text-white flex justify-center items-center shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform duration-300">
      <Sparkles className="w-6 h-6 text-white" />
    </div>
  </div>
</div>
     {loading?( <div className='flex justify-center items-center h-full'>
      <span className='w-10 h-10 my-1 rounded-full border-3 border-primary
      border-t-transparent animate-spin'></span>
    </div>):( <div className='space-y-3'>
        <p className="mt-6 mb-4">Recent Creations</p>
         {creations.map((item) => (
            <Creationitem key={item._id} item={item} />
          ))}
      </div>)}
    </div>
  )
}

export default Dashboard
