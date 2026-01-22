import React, { useContext } from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import Result from './pages/Result'
import BuyCredit from './pages/BuyCredit'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Login from './components/Login'
import { AppContext } from './context/AppContext'
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import Layout from './pages/Layout'
import Dashboard from './pages/Dashboard'
import WriteArticle from './pages/WriteArticle'
import BlogTitles from './pages/BlogTitles'
import RemoveBackground from './pages/RemoveBackground'
import RemoveObject from './pages/RemoveObject'
import ReviewResume from './pages/ReviewResume'
import Community from './pages/Community'
const App = () => {
  const {showLogin}=useContext(AppContext)
  return (
    <div className="min-h-screen relative"
>
  <ToastContainer position='bottom-right'/>
  
  {showLogin&&<Login/>}
      <Routes>
        <Route path='/'element={ <Home/>}/>
        <Route path='/ai'element={<Layout/>}>
          <Route index element={<Dashboard/>}/>
          <Route path='write-article' element={<WriteArticle/>}/>
          <Route path='blog-titles' element={<BlogTitles/>}/>
          <Route path='result'element={ <Result/>}/>{/*image genrator */}
          <Route path='remove-background' element={<RemoveBackground/>}/>
          <Route path='remove-object' element={<RemoveObject/>}/>
          <Route path='review-resume'element={ <ReviewResume/>}/>
          <Route path='community'element={ <Community/>}/>
        </Route>
         
          <Route path='/buy'element={
            <div className='px-4 sm:px-10 md:px-14 lg:px-28'>
            <Navbar />
            <BuyCredit />
            <Footer />
          </div>}/>

      </Routes>
      
    
    </div>
  )
}

export default App
