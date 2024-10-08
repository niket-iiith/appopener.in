import React, { useState, useRef, useEffect } from 'react';
import "../css/carousel.css";
import { MdOutlineIosShare } from "react-icons/md";

const Carousel = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef(null);
  let touchStartX = useRef(0);
  let touchEndX = useRef(0);
  const dragStartX = useRef(0);
  const dragEndX = useRef(0);
  const autoSlideInterval = useRef(null);

  const nextSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === items.length - 1 ? 0 : prevIndex + 1);
    resetAutoSlide();
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? items.length - 1 : prevIndex - 1);
    resetAutoSlide();
  };

  // Handle touch start
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  // Handle touch end
  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX;
    handleGesture();
  };

  // Determine swipe direction
  const handleGesture = () => {
    const diff = touchStartX.current - touchEndX.current;
    const swipeThreshold = 50; // Minimum distance in pixels for it to count as a swipe

    if (diff > swipeThreshold) {
      // Swipe left, go to next slide
      nextSlide();
    } else if (diff < -swipeThreshold) {
      // Swipe right, go to previous slide
      prevSlide();
    }
  };
  const handleMouseDown = (e) => {
    dragStartX.current = e.clientX;
  };

  // Handle mouse drag end
  const handleMouseUp = (e) => {
    dragEndX.current = e.clientX;
    const swipeThreshold = 50; 

    if (dragStartX.current - dragEndX.current > swipeThreshold) {
      nextSlide(); // Drag left
    } else if (dragStartX.current - dragEndX.current < -swipeThreshold) {
      prevSlide(); // Drag right
    }
  };

  
 /*  const handleItemClick = (index) => {
    setCurrentIndex(index);
  }; */
  const jumpToSlide = (index) => {
    setActiveIndex(index);
  };
  const startAutoSlide = () => {
    autoSlideInterval.current = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds
  };

  const resetAutoSlide = () => {
    clearInterval(autoSlideInterval.current);
    startAutoSlide();
  };

  useEffect(() => {
    startAutoSlide(); // Start auto-slide on component mount
    return () => {
      clearInterval(autoSlideInterval.current); // Clear interval on component unmount
    };
  }, []);


  return (
    <div 
    onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}>
    
    <div
      className="carousel"
      ref={carouselRef}
     
    >
      <button onClick={prevSlide} className="carousel__btn carousel__btn--prev">
        &lt;
      </button>

      <div className="carousel__spotlight">
        {items.map((item, index) => {
          let className = "carousel__item";

          if (index === activeIndex) {
            className += " carousel__item--active";
          } else if (index === activeIndex - 1 || (activeIndex === 0 && index === items.length - 1)) {
            className += " carousel__item--prev";
          } else if (index === activeIndex + 1 || (activeIndex === items.length - 1 && index === 0)) {
            className += " carousel__item--next";
            
          }

          return (
            <div key={index} className={className}>
              <img
                src={item.image}
                alt={`Slide ${index}`}
                className="carousel__img"
              />
              <div className="carousel__content">
                <button className="carousel__share-btn">
                  <MdOutlineIosShare size={24} />
                </button>
                <a href={item.link} style={{ textDecoration: 'none' }}>
                  <p className="carousel__title text-white">{item.title}</p>
                  <p className="carousel__description text-white">{item.description}</p>
                </a>
              </div>
            </div>
          );
        })}
      </div>

      <button onClick={nextSlide} className="carousel__btn carousel__btn--next">
        &gt;
      </button>
      </div>
      <div className="carousel__indicators">
        {items.map((_, index) => (
          <div
            key={index}
            className={`carousel__indicator ${index === activeIndex ? 'active' : ''}`}
            onClick={() => jumpToSlide(index)}
          ></div>
        ))}
      </div>
    </div>
    
  );
};

export default Carousel;
