import React from 'react'
import Header from '../components/Header'
import Description from '../components/Description'
import Testimonials from '../components/Testimonials'
import GenerateBtn from '../components/GenerateBtn'
import AiTools from '../components/AiTools'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Home = () => {
  return (
    /* REPLACED: Light blue gradient 
       ADDED: bg-mesh (from our CSS) and min-h-screen 
    */
    <div className='relative min-h-screen bg-mesh text-white selection:bg-purple-500/30'>
      
      {/* Container to maintain layout padding */}
      <div className='px-4 sm:px-10 md:px-14 lg:px-28 pb-20'>
        
        <Navbar />

        {/* Added spacing and subtle transitions between sections 
           to ensure the "Glass" cards don't feel cluttered 
        */}
        <div className='flex flex-col gap-24 sm:gap-32 mt-10'>
          <Header />
          
          <AiTools />
          
          <Description />
          
          <Testimonials />
          
          <div className='py-10'>
            <GenerateBtn />
          </div>
        </div>

      </div>

      <Footer />
    </div>
  )
}

export default Home