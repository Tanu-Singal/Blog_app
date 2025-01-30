import React from 'react'
import assets from '../../assets/assets'
import './Blogtable.css'
const Blogtable = ({authorImg,title,author,date,deleteblog,mongoId}) => {
  const Blogdate=new Date(date);
  return (
  
        <tr>
      <th scope="row"><img src={authorImg?authorImg:assets.profile_icon} alt=""/>
       <p style={{color:" rgba(231, 6, 92, 0.71)",fontWeight:"bolder"}}>{author?author:"No author"}</p>
      </th>
      <td style={{fontWeight:"bolder",color:"black"}}>{title?title:"no title"}</td>
      <td style={{fontWeight:"bolder",color:"black"}}>{Blogdate.toDateString()}</td>
      <td style={{cursor:"pointer",color:"red",fontWeight:"bolder"}} onClick={()=>deleteblog(mongoId)}>x</td>
    </tr>
  )
}

export default Blogtable


