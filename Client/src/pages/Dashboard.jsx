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
      <div className="flex  gap-4 flex-wrap">
        <div className="flex justify-between items-center w-72 p-4 px-6 bg-white rounded-xl border border-gray-200">
          <div className="text-slate-600">
            <p className="text-sm">Total Creations</p>
            <h2 className="text-xl font-semibold">{creations.length}</h2>
          </div>
 <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#3588F2] to-[#0BB0D7] text-white flex justify-center items-center">
            <Sparkles className="w-5 text-white" />
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
