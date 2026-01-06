import React from 'react'
import Header from '../components/Header'
import Description from '../components/Description'
import Testimonials from '../components/Testimonials'
import GenerateBtn from '../components/GenerateBtn'
import AiTools from '../components/AiTools'

const Home = () => {
  return (
    <div >
     <Header/>
     
     <AiTools/>
     <Description/>
     <Testimonials/>
     <GenerateBtn/>
    </div>
  )
}

export default Home
