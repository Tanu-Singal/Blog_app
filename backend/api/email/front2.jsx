import React, { useEffect, useState } from 'react'

const front2 = () => {
    const [data,setData]=useState(null);
    
    useEffect(()=>{
        fetch("/api/blog")
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

export default front2