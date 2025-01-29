
import React, { useState } from 'react';
import assets from '../../../../frontend/src/assets/assets';
import './Sidebar.css';
import { Link } from 'react-router-dom';

const Sidebar = () => {
const[menu,setMenu]=useState("")
  return (
    <>
    
    <div className="sidebar">
     <img src={assets.logo} alt="Blogger Logo" className="logo" />
      <hr className='line'/>
      <div className="button-container">
        <button className={`side-button ${menu === "Add_Blogs" ? "icon1" : ''}`} onClick={()=>setMenu("Add_Blogs")}>
        <Link to="/admin/addProduct">  <img src={assets.add_icon} alt="Add Blogs" className="icon"/></Link>
          Add Blogs
        </button>
        <button className={`side-button ${menu=="Blogs_List"?"icon1":''}`}  onClick={()=>setMenu("Blogs_List")} >
         <Link to="/admin/blogList"> <img src={assets.blog_icon} alt="Blogs List" className="icon"/></Link>
          Blogs List
        </button>
        <button className={`side-button ${menu=="subscription"?"icon1":''}`} onClick={()=>setMenu("subscription")}>
          <Link to="/admin/subscription"><img src={assets.email_icon} alt="Subscriptions" className="icon" /></Link>
          Subscriptions
        </button>
      </div>
    </div>
    </>
   
  );
};

export default Sidebar;



