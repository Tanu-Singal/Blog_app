import React from 'react'
import './Blogitem.css'
import assets from '../assets/assets'
import { Link } from 'react-router-dom'
const Blogitem = (props) => {
  return (
     <div className="card" style={{backgroundColor:props.lightmode?"white":"black"}} >
      <Link to={`/Blog/${props.id}`}> <img src={props.image} className="card-img-top" alt="..."/></Link>
            
            <div className="card-body">
              <p className='category' style={{color:props.lightmode?"black":"rgba(231, 6, 92, 0.71)"}} >{props.category}</p>
              <h5 className="card-title" style={{color:props.lightmode?"black":"white"}}>  {props.title.length > 25
    ? props.title.slice(0, 100) + "..." 
    : props.title}</h5>
              <p className="card-text" style={{color:props.lightmode?"black":"white"}}>  {props.description.length > 100 
    ? props.description.slice(0, 100) + "..." 
    : props.description}</p>
              <div className="bl-item">
              <Link to={`/Blog/${props.id}`} className="btn button" style={{padding:"5px 5px"}}>Read More <img src={assets.arrow} alt=""/></Link>
              </div>
             
            </div>
          </div>
  )
}

export default Blogitem
