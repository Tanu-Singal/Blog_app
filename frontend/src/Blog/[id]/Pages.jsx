import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import './Pages.css'
import assests from '../../assets/assets';


const Pages = (props) => {
  
   const [hover, setHover] = useState(false);
  const [data,setdata]=useState(null);
  const {id}=useParams();
  const fetchblogdata=async()=>{
  /* for(let i=0;i<blog_data.length;i++)
   {
     if(Number(id)===blog_data[i].id)
     {
         setdata(blog_data[i]);
         break;
         
     }
   }*/
    
  const response=await fetch(`https://blog-app6-rv4t.onrender.com/api/blog?id=${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch blog data");
  }
  const result=await response.json();
 
  setdata(result.obj);
  
  }
  useEffect(()=>{
fetchblogdata();
  },[id])
  
  return data ? (
    <>
      <div>
      <div
          className="pages-navbar"
          style={{
            backgroundImage: !props.lightmode ? `url(${assests.p3})` : "",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          
<nav className="navbar navbar-expand-lg navbar-light navi">
<div className="container-fluid">
 <img className="nav-img" src={assests.frame_logo} alt=""/>
<Link to='/admin'>
<button className='head-btn' style={{border: 'none' ,background: hover ? 'none' : 'initial',transition:'all 0.4s ease'}}    onMouseEnter={() => setHover(true)} 
  onMouseLeave={() => setHover(false)}>

 <div className="ms-auto">
 
 <div className="d-flex naviii">
<div className="frame">
<div className="div" >
 <div className="text-wrapper">GET STARTED

 <img className="img" alt="Frame" src={assests.arrow} />
 </div>
</div>
</div>
</div>

</div>
  </button>
</Link>
</div>
</nav>
        </div>
        <div className="pages-wrapper">
          <div className="mains">
            <div className="main_logo">
              <p>{data.title}</p>
            </div>
            <div className="main_img">
              <Link to="/">
                <img src={data.authorImg} alt="" />
              </Link>
            </div>
            <div className="para">
              <p>{data.author}</p>
            </div>
            <div className="big">
              <img className="page_img" src={data.image} alt="" />
              <h1>Introduction:</h1>
              <p>{data.description}</p>
              <h3>Step 1: Self Reflection and Goal Setting</h3>
              <p>
                This blog post explores the profound connection between
                self-reflection and goal setting. Learn how to harness the power
                of introspection to identify your aspirations, set meaningful
                goals, and overcome challenges on your path to personal growth
                and fulfillment.
              </p>
              <p>
                "The only way to do great work is to love what you do." - Steve
                Jobs.
              </p>
              <h3>Step 2: Self Reflection and Goal Setting</h3>
              <p>
                This blog post explores the profound connection between
                self-reflection and goal setting...
              </p>
              <h3>Step 3: Self Reflection and Goal Setting</h3>
              <p>
                This blog post explores the profound connection between
                self-reflection and goal setting...
              </p>
              <h3>Conclusion:</h3>
              <p>
                This blog post explores the profound connection between
                self-reflection and goal setting...
              </p>
              <div className="last">
                <p>Share this article on social media</p>
                <div className="last_icon">
                  <div className="ion">
                    <img src={assests.facebook_icon} alt="" />
                  </div>
                  <div className="ion">
                    <img src={assests.twitter_icon} alt="" />
                  </div>
                  <div className="ion">
                    <img src={assests.googleplus_icon} alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footers">
          <div className="image_footer">
            <img className="footer_img" src={assests.logo} alt="" />
          </div>
          <div className="head_footer">
            <p className="footer_para">
              All rights reserved. Copyright@ Blogger
            </p>
          </div>
          <div className="footer_icon">
            <div className="icon_png">
              <img src={assests.facebook_icon} alt="" />
            </div>
            <div className="icon_png">
              <img src={assests.twitter_icon} alt="" />
            </div>
            <div className="icon_png">
              <img src={assests.googleplus_icon} alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <></>
  );
};

export default Pages;

