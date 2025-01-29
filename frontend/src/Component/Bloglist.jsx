import React, { useEffect, useState } from 'react'
import './Blogitem.jsx'
import './Bloglist.css'
import Blogitem from './Blogitem.jsx'
const Bloglist = (props) => {
    const [menu,setMenu]=useState("All")
    const [blogs,setBlog]=useState([]);
    const fetchblog=async()=>{
    
      const response=await fetch("http://localhost:4000/api/blog",{
        method:"GET"
      })
      if (!response.ok) {
        throw new Error('Network response was not ok');
    }
      const data=await response.json();
      console.log("API Response:", data);
      setBlog(data.obj.blogs)
     
    }
    useEffect(()=>{
     fetchblog();
    },[])
  return (
    <div>
      <ul style={{display:"flex",justifyContent:"center",listStyle:"none",gap:"22px",color:props.lightmode?"black":"white",fontWeight:props.lightmode?"bolder":""
      }}>
  <li className={menu==="All"?"li_group":''} onClick={()=>setMenu("All")} >All</li>
  <li className={menu==="Technology"?"li_group":''} onClick={()=>setMenu("Technology")}>Technology</li>
  <li className={menu==="Startup"?"li_group":''} onClick={()=>setMenu("Startup")}>Startup</li>
  <li className={menu==="Lifestyle"?"li_group":''} onClick={()=>setMenu("Lifestyle")} >Lifestyle</li>

</ul>
<div className="item-menu-bar">
   
          {blogs.filter((item)=>menu==="All"?true:item.category.toLowerCase()===menu.toLowerCase()).map((item,i)=>{
        return <Blogitem  key={i} image={item.image} id={item._id} title={item.title} description={item.description} category={item.category} lightmode={props.lightmode}/>
    })}
    
</div>
    </div>
  )
}

export default Bloglist
