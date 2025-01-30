import React, { useEffect, useState } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import './Page1.css'
import { toast } from 'react-toastify';
import assests from '../../assets/assets'
import Blogtable from '../admincomp/Blogtable';
const Page1 = () => {

  const [blogs,setBlog]=useState([]);
  const fetchblog=async()=>{
   const response=await fetch("https://blog-53.onrender.com/api/blog",{
    method:"GET"
   })
   const data=await response.json();
   setBlog(data.obj.blogs)
  }

  const deleteblog=async(mongoId)=>{
      const resp=await fetch(`https://blog-53.onrender.com/api/blog/${mongoId}`,{
        method:"DELETE",
       
      })

      const data = await resp.json();
      toast.success("Blog deleted successfully!");
      fetchblog();
  }
  useEffect(()=>{
   fetchblog()
  },[])
  return (
    <div className='tt'>
      <div style={{backgroundImage:`url(${assests.p})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="blogListte">
        <h2 >All Blogs</h2>
      </div>
      </div>
      
      <div className="table-container" style={
  {overflowY:"auto",maxHeight:"70vh"}
      }>
      <table className="table">
  <thead>
    <tr>
      <th scope="col" style={{fontWeight:"bolder",color:"black"}}>Author Name</th>
      <th scope="col" style={{fontWeight:"bolder",color:"black"}}>Blog Title</th>
      <th scope="col" style={{fontWeight:"bolder",color:"black"}}>Date</th>
      <th scope="col" style={{fontWeight:"bolder",color:"black"}}>Action</th>
    </tr>
  </thead>
  <tbody>
    {blogs.map((item,index)=>{
       return <Blogtable key={index} mongoId={item._id} title={item.title} author={item.author} authorImg={item.authorImg} date={item.date} deleteblog={deleteblog}/>
    })}

  </tbody>
  </table>
    </div>
      </div>
    
  )
}

export default Page1
