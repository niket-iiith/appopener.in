// ExpandableFooter.js
import React, { useState, useEffect, useRef } from 'react';
import '../css/expandable-footer.css';
import { FaFacebook, FaInstagram, FaMailBulk, FaMobile, FaPinterest, FaTwitter, FaWhatsapp, FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router-dom';
const ExpandableFooter = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSticky,setIsSticky] = useState(true);
  const footerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (footerRef.current) {
        const footerRect = footerRef.current.getBoundingClientRect();
        const isFooterVisible = footerRect.top < window.innerHeight;
        // console.log("Footer top : ",footerRect);
        // console.log("Window inner height : ",window.innerHeight)
        setIsExpanded(isFooterVisible);
        setIsSticky(!isFooterVisible)
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <footer ref={footerRef} className="expandable-footer">
      <div className="footer-container">
          <nav className={`main-nav ${isSticky? 'sticky': ''}`}>
            <a href="#home">Home</a>
            <a href="#explore">Explore</a>
            <a href="#learn">Learn</a>
            <a href="#contact">Contact</a>
          </nav>
        
        <div className={`expanded-content flex  ${isExpanded ? 'visible' : ''}`}>
          <div className="footer-section">
            <h3>Policies</h3>
            <ul>
              <li><Link  to='/privacypolicy' style={{textDecoration:"none",cursor:'pointer' }}> Privacy Policy</Link></li>
              <li><a href="#astronomy"></a></li>
            </ul>
          </div>
          <div className="footer-section">
           {/*  <h3>Learn</h3>
            <ul>
              <li><a href="#space-missions">Space Missions</a></li>
              <li><a href="#exoplanets">Exoplanets</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Legal</h3>
            <ul>
              <li><a href="#privacy-policy">Privacy Policy</a></li>
              <li><a href="#terms-of-service">Terms of Service</a></li>
            </ul>
          </div>
          <div className="footer-section"> */}
            <h3>Contact Details</h3>
            <ul>
              <li><a href="mailto:contactus@appopener.com" style={{textDecoration:"none",fontFamily:'Montserrat Alternates'}} className="text-muted"> contactus@appopener.com</a></li>
             
            </ul>
            <h3>Contact With Us</h3>
            <ul>
            <li className="list-inline-item"><a href="" target="_blank" title="facebook"><FaFacebook style={{color:'#ccc'}} size="32px"/></a></li>
                            <li className="list-inline-item"><a href="" target="_blank" title="instagram"><FaInstagram style={{color:'#ccc'}} size="32px"/></a></li>
                            <li className="list-inline-item"><a href="" target="_blank" title="youtube"><FaYoutube style={{color:'#ccc'}} size="32px"/></a></li>
                            <li className="list-inline-item"><a href="" target="_blank" title="pinterest"><FaPinterest style={{color:'#ccc'}} size="32px"/></a></li>
             
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ExpandableFooter;
