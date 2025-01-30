import React, { useEffect, useState } from 'react'

const chats = () => {
       const [data,setData]=useState(null);
        
        useEffect(()=>{
            fetch("/api/ask")
            .then((response) => response.json())
            .then((data) => setData(data.msg))
            .catch((err) => console.error("Error fetching API:", err));
        },[])
  return (
    <div>
       {data?<p>{data}</p>:<p>Loading...</p>}
    </div>
  )
}

export default chats
