import React, { useState, useRef, useEffect } from "react";
import "../css/FloatingButtons.css";
import slogo from "../assets/slogo.avif";
import { Link } from "react-router-dom";
import next from "../assets/next.avif";
import insta from "../assets/insta.avif"
import TagManager from "react-gtm-module";
import { events } from "@react-three/fiber";

// const sendGtmEvent = (label)=>{
//   TagManager.dataLayer({
//     dataLayer:{
//       event:"click_instagram_button",
//       eventCategory:"Floating buttons",
//       eventLabel:label
//     }
//   })
// }

const sendDirectGA4Event = (label, url) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'click_instagram_button', {
      debug_mode:true,
      event_category: 'Floating buttons',
      event_label: label,
      link_url: url,
      custom_parameter_1: 'floating_social_button'
    });
    
    console.log('GA4 Event sent:', {
      event: 'click_instagram_button',
      event_category: 'Floating buttons',
      event_label: label,
      link_url: url
    });
  } else {
    console.warn('gtag not available');
  }
};

const Float = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 400, left: window.innerWidth - 100 }); // right side
  const containerRef = useRef(null);

  const toggleButtons = () => {
    setIsOpen(!isOpen);
  };

  const openInNewTab = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    const element = containerRef.current;
    const startX = e.clientX - element.offsetLeft;
    const startY = e.clientY - element.offsetTop;

    const handleMouseMove = (e) => {
      setPosition({
        top: e.clientY - startY,
        left: e.clientX - startX,
      });
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    const element = containerRef.current;
    const startX = touch.clientX - element.offsetLeft;
    const startY = touch.clientY - element.offsetTop;

    const handleTouchMove = (e) => {
      const touch = e.touches[0];
      setPosition({
        top: touch.clientY - startY,
        left: touch.clientX - startX,
      });
    };

    const handleTouchEnd = () => {
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };

    document.addEventListener("touchmove", handleTouchMove);
    document.addEventListener("touchend", handleTouchEnd);
  };

  useEffect(() => {
    if (isOpen) {
      const handleClickOutside = (event) => {
        if (!containerRef.current.contains(event.target)) {
          setIsOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  return (
    <div
      className="floating-container"
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
        position: "fixed",
        zIndex: 0,
      }}
    >
      <div className={`arrow-button ${isOpen ? "open" : ""}`} onClick={toggleButtons}>
        <img className="w-12" src={slogo} alt="toggle" />
      </div>
      <div className={`floating-buttons ${isOpen ? "open" : ""} right`}>
       <button className="floating-btn bg-white">
          <Link
            to="https://www.instagram.com/appopener.com8/"
            onClick={(e) => {
              e.preventDefault();
              sendDirectGA4Event("Appopener's instagram page","https://www.instagram.com/appopener.com8/")
              // sendGtmEvent("Instagram Reel Button");
              openInNewTab("https://www.instagram.com/appopener.com8/");
            }}
          >
             <img className="w-10" src={insta} alt="closed" />
          </Link>
        </button>
        <button className="floating-btn bg-white">
          <Link
            to="https://www.instagram.com/home4spawns"
            onClick={(e) => {
              e.preventDefault();
              // sendGtmEvent("Home 4 spawns button");
              sendDirectGA4Event("Home 4 spawns button","https://www.instagram.com/home4spawns")
              openInNewTab("https://www.instagram.com/home4spawns");
            }}
          >
             <img className="w-10" src={insta} alt="closed" />
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Float;
