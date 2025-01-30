import React from 'react'

const Subscriptiontable = ({email,date,mongoId,deleteEmail}) => {
    const emaildate=new Date(date);
  return (
       <tr>
        <th>
       <p style={{fontWeight:"bold",color:"black"}}>{email?email:"No email"}</p>
      </th>
      <td>{emaildate.toDateString()}</td>
      <td style={{cursor:"pointer",color:"red",fontWeight:"bolder"}} onClick={()=>deleteEmail(mongoId)}>x</td>
    </tr>
    
  )
}

export default Subscriptiontable
