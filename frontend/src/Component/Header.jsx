import React, { useState } from 'react'
import './Header.css'
import assests from '../assets/assets'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Link } from 'react-router-dom'
const Header = (props) => {
  const [hover, setHover] = useState(false);
  const [email,setEmail]=useState("");

  const onSubmithandle=async(e)=>{
   e.preventDefault();
 

   const response=await fetch("http://localhost:3001/api/email",{
    method:"POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  })
  const result = await response.json();

    if (response.ok) {
      toast.success("Email added successfully");
      setEmail("");
    } else {
      toast.error("Error");
    }
  }
  return (

    <div>
      <ToastContainer theme="colored"/>
  <nav className="navbar navbar-expand-lg navbar-light navi">
  <div className="container-fluid">
   <img className="nav-img" src={assests.frame_logo} alt=""/>
  <Link to='/admin'>
  <button className='head-btn' style={{border: 'none' ,background: hover ? 'none' : 'initial',transition:'all 0.4s ease'}}    onMouseEnter={() => setHover(true)} 
    onMouseLeave={() => setHover(false)}>
  
   <div className="ms-auto">
   
   <div className="d-flex naviii">
 <div className="frame">
 <div className="div" >
   <div className="text-wrapper">GET STARTED

   <img className="img" alt="Frame" src={assests.arrow} />
   </div>
 </div>
</div>
 </div>

</div>
    </button>
  </Link>
  
  
 
  </div>
</nav>

<div className="main">
<div className="label">
      <div className="text-wrapper">LATEST BLOGS</div>
      
    </div>
    <div className="para">
    <p className="text-center parag " style={{color:props.lightmode?"black":"white"}} >“Don’t try to plan everything out to the very last detail. I’m a big believer in just getting it out there: create a minimal viable</p>
     <p className='text-center parag' style={{color:props.lightmode?"black":"white"}}> product or website, launch it, and get feedback.”</p>
   
    </div>
    <div className="input-group mb-3 form-head" onSubmit={onSubmithandle}>
  <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" className="form-control form-inp" placeholder="Enter your email" aria-label="Recipient's username" aria-describedby="button-addon2"/>
  <button className="btn btn-outline-secondary form-button" type="submit" style={{color:props.lightmode?"black":"white"}}>Subscribe</button>
</div>
</div>

    </div>
  )
}

export default Header
/* <button className="btn" type="submit" style={{marginRight:"72px",marginTop:"15px"}}>Get Started <img src={assests.arrow} alt=""/></button> 
    */