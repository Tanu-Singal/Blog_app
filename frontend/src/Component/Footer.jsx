import React from 'react'
import assests from '../assets/assets'
import './Footer.css'
const Footer = () => {
  return (
    <div>
      <div className="footer">
        <div className="image">
              <img src={assests.logo} alt=""/>
        </div>
        <div className="footer-head">
            <p>All right reserved. Copyright@ Blogger</p>
        </div>
        <div className="footer-icon">
            <div className="icon_img"><img src={assests.facebook_icon} alt=""/></div>
            <div className="icon_img"><img src={assests.twitter_icon} alt=""/></div>
            <div className="icon_img"><img src={assests.googleplus_icon} alt=""/></div>
        </div>
      </div>
    </div>
  )
}

export default Footer

