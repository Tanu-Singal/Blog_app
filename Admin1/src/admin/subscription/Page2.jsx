import React, { useEffect, useState } from 'react'
import './Page2.css'
import { toast } from 'react-toastify';
import assests from '../../../../frontend/src/assets/assets';
import Subscriptiontable from '../admincomp/Subscriptiontable';
const Page2 = () => {
    const [emails,setemails]=useState([]);
    const fetchemails=async()=>{
      const response=await fetch("http://localhost:3001/api/email",{
        method:"GET"
      })
      const data=await response.json();
      console.log(data);
      setemails(data.emails)
    }
    const deleteEmail=async(mongoId)=>{
      const resp=await fetch(`http://localhost:3001/api/email/${mongoId}`,{
        method:"DELETE"
      })
       const data = await resp.json();
        toast.success("Email deleted successfully!");
        fetchemails();
    }
    useEffect(()=>{
       fetchemails();
    },[])

  return (
    <div className='pp'>
       <div style={{backgroundImage:`url(${assests.p})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="blogListte">
        <h2 >All Subscriptions</h2>
      </div>
      </div>
     <div className="table-container">
     <table className="table">
  <thead>
    <tr>
      <th scope="col" style={{fontWeight:"bolder",color:"black"}}>Email Subscriptions</th>
      <th scope="col" style={{fontWeight:"bolder",color:"black"}}>Date</th>
      <th scope="col" style={{fontWeight:"bolder",color:"black"}}>Action</th>
    </tr>
  </thead>
  <tbody>
   {emails.map((item,idx)=>{
   return <Subscriptiontable key={idx} mongoId={item._id} email={item.email} date={item.date} deleteEmail={deleteEmail}/>
    })}

  </tbody>
  </table>
     </div>
  
    </div>
  )
}

export default Page2
