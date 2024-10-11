import React from 'react';
import "../css/BrandTray.css";// Create a CSS file with the sliding animation

const BrandTray = ({ items }) => {
  const duplicatedItems = [...items, ...items];
 
 

  return (
    <div className="stories-container flex space-x-2 mx-2 ">
      <div  className="story-item flex-row gap-3  items-center">
        {duplicatedItems.map((item, index) => (
          <div key={index} className="story-avatar-wrapper">
            <a href={item.link} target="_blank" rel="noopener noreferrer">
              <img
                src={item.imgSrc}
                alt={item.alt}
                className="story-avatar rounded-full border-4 border-black p-1"
                style={{ width: '70px', height: '70px' }}
              />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BrandTray;