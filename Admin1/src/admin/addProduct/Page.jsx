import React, { useState } from 'react'

import './Page.css'
import { toast } from 'react-toastify'
import assests from '../../../../frontend/src/assets/assets';
const Page = () => {
 
  const [image,setImage]=useState(false)
  const [data,setData]=useState({
    title:"",
    description:"",
    category:"Startup",
    author:"Tanu",
    authorImg:"/author.png"

  })
  const onChangeHandler=(event)=>{
    const name=event.target.name;
    const value=event.target.value;
    setData(data=>({...data,[name]:value}))
  }

  const onsubmithandler=async(e)=>{
      e.preventDefault(); // to prevent page refreshing
      const formData=new FormData();//FormData obj to hold ALL data // when u need to upload file and image alaong with text then need to make this formdata otherwise if there is only plain text then u dont need to make this formdata give body:data
     formData.append("title",data.title);
     formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("author", data.author);
    formData.append("authorImg", data.authorImg);
    formData.append("image", image); 

    const response=await fetch("https://blog-app6-rv4t.onrender.com/upload",{
      method:"POST",
      body:formData,
    })
    const result=await response.json();
    if(response.ok)
    {
      toast.success("Blog added successfully");
      setImage(false);
      setData({
        title:"",
        description:"",
        category:"Startup",
        author:"Tanu",
        authorImg:"/author.png"
      })
    }
    else{
      toast.error("Error")
    }
  }
  return (
    <div className='ss' >
      <form onSubmit={onsubmithandler} style={{backgroundImage:`url(${assests.p})`, backgroundSize: 'cover', backgroundPosition: 'center' }} >
      <div className="form-1">
    <label htmlFor="exampleInputthumbnail" className="form-label">Upload thumbnail</label>
    <label htmlFor='image'>
      <img className='Page_img' src={!image?assests.upload_area:URL.createObjectURL(image)} alt=""/>
    </label>
    <input onChange={(e)=>setImage(e.target.files[0])} type='file' id='image'hidden required/>
  </div>
  <div className="form-2">
    <label htmlFor="exampletitle" className="form-label">Blog Title</label>
    <input name='title' onChange={onChangeHandler} value={data.title} type="text" className="form-control" placeholder='type here' required/>
  </div>
  <div className="form-2">
    <label htmlFor="examplede" className="form-label">Blog Description</label>
    <textarea rows={6} name='description' onChange={onChangeHandler} value={data.description} type="text" className="form-control" placeholder='write content here' required/>
  </div>
  <div className="form-2">
    <label htmlFor="examplecategory" className="form-label">Blog category</label>
    <br/>
   <select name='category' onChange={onChangeHandler} value={data.category}>
    <option value="Startup">Startup</option>
    <option value="Technology">Technology</option>
    <option value="Lifestyle">Lifestyle</option>
   </select>
  </div>
   <br/>
  <button type="submit" className="btn" style={{backgroundImage:`url(${assests.up1})`,color:"black",fontWeight:"bolder"}}>Add</button>
</form>
    </div>
  )
}

export default Page
