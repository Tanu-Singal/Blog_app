import React from 'react'
import assests from '../../../../frontend/src/assets/assets';
import './Layout.css'

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify'
import Sidebar from '../admincomp/Sidebar';
import { Link, Outlet } from 'react-router-dom';
//import { auth, logout } from '../../../backend/firebase';
const Layout = () => {
 /* const handleLogout = () => {
    logout(auth);
  }*/
  return (
    <>
    <div className="layout-container">
      <ToastContainer theme="dark"/>
    <Sidebar/>
  <div className="admin-panel">
   <div className="panel-title"><h3>Admin Panel</h3></div>
   <div className="profile"> <Link to='/'> <img src={assests.profile_icon} alt=""/></Link></div>
  </div>
    </div>
    <Outlet/>
  </>
  
  )
}

export default Layout
