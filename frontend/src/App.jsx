import React, { useEffect, useState } from 'react'
import './App.css'
import Bloglist from './Component/Bloglist'
import Footer from './Component/Footer'
import { Route, Routes, useNavigate } from 'react-router-dom'

import assests from './assets/assets'
//import { onAuthStateChanged } from 'firebase/auth'
import Chatbox1 from './Component/Chatbox1'

import Header from './Component/Header'
//import Login from './Component/Login'
//import { auth } from '../../backend/firebase'
import Pages from './Blog/[id]/Pages'
import Page1 from '../../Admin1/src/admin/blogList/Page1'
import Page from '../../Admin1/src/admin/addProduct/Page'
import Page2 from '../../Admin1/src/admin/subscription/Page2'
import Layout from '../../Admin1/src/admin/layout/Layout'


const App = () => {
    const [lightmode,setLightmode]=useState(false);

  const togglemode=()=>{
    setLightmode(!lightmode);
    if(!lightmode)
    {
      document.body.classList.add('light-mode');
    }
    else{
      document.body.classList.remove('light-mode');
    }
  }


 /* const navigate=useNavigate();
  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if(user)
      {
        console.log("Logged In");
        navigate('/admin');
      }
      else{
        console.log("Logged Out");
        navigate('/');
      }
    })
  },[])*/
  return (
    <>
      <div className="theme-toggle-btn-container">
  <button onClick={togglemode} className='theme-toggle-btn'  style={{
            position: 'fixed',  // Change to 'fixed' to ensure it's always in view
            left: '50%',
            bottom: '30px',     // Position it a bit higher from the bottom
            transform: 'translateX(-50%)',  // Proper centering horizontally
            zIndex: '1000', 
            backgroundColor: '#FFCDD5', // Adjust opacity here
            border: 'none',
            color:'black',
          
            fontSize:"12px"   // Ensure the button is above other content
          }}>{lightmode?'Switch to Dark Mode' : 'Switch to Light Mode'}</button>
</div>
      <div style={{
        backgroundImage: !lightmode?`url(${assests.p3})`:'',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        width: '100vw',
      }}>
 
   <Routes>
   <Route
          path="/"
          element={
            <>
              <Header lightmode={lightmode} />
              <Bloglist lightmode={lightmode} />
              <Footer lightmode={lightmode} />
            </>
          }
        />
    <Route path="/Blog/:id" element={<Pages lightmode={lightmode}/>}/>
    < Route path="/admin" element={<Layout lightmode={lightmode}/>}>
   {/* Nested route for addProduct inside Layout */}
          <Route path="addProduct" element={<Page lightmode={lightmode} />} />
           <Route path="blogList" element={<Page1 lightmode={lightmode}/>}/>
           <Route path="subscription" element={<Page2 lightmode={lightmode} />}/>
        </Route>
      {/*<Route path='/login' element={<Login lightmode={lightmode}/>}/>*/}
   </Routes>
   <div style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 1000
      }}>
        <Chatbox1 lightmode={lightmode} togglemode={togglemode}/>
      </div>

 </div>
    </>
    
  )
}

export default App
