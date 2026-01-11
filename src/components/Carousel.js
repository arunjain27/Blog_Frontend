import React, { useState, useEffect } from 'react';
import '../css/carousel.css';
import carousel_1 from '../images/carousel_1 - Copy.webp';
import carousel_1_2x from '../images/carousel_1@2x.webp';
import carousel_2 from '../images/carousel_2 - Copy.webp';
import carousel_2_2x from '../images/carousel_2@2x.webp';
import carousel_3 from '../images/carousel_3 - Copy.webp';
import carousel_3_2x from '../images/carousel_3@2x.webp';

const slidesData = [
  {
    imageSrc: carousel_1,
    imageSrcSet: `${carousel_1} 1x, ${carousel_1_2x} 2x`,
    heading: 'Share Your Voice: Join Our Community of Passionate Bloggers',
  },
  {
    imageSrc: carousel_2,
    imageSrcSet: `${carousel_2} 1x, ${carousel_2_2x} 2x`,
    heading: 'Be Heard: Publish Your Blogs and Connect with Like-Minded Readers',
  },
  {
    imageSrc: carousel_3,
    imageSrcSet: `${carousel_3} 1x, ${carousel_3_2x} 2x`,
    heading: 'Join the Conversation: Share Your Expertise and Experiences',
  },
];

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setCurrentSlide((prev) => (prev + 1) % slidesData.length);
      setTimeout(() => setIsTransitioning(false), 1200);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => {
    if (isTransitioning || index === currentSlide) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 1200);
  };

  return (
    <div className="carousel-container">
      <div className="carousel-wrapper">
        {slidesData.map((slide, index) => (
          <div
            key={index}
            className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
          >
            {/* IMPORTANT: Wrap image in this div for Ken Burns effect */}
            <div className="carousel-slide-image-wrapper">
              <img
                src={slide.imageSrc}
                srcSet={slide.imageSrcSet}
                alt={`Slide ${index + 1}`}
                loading={index === 0 ? 'eager' : 'lazy'}
              />
            </div>
            <div className="carousel-caption">
              <h2>{slide.heading}</h2>
            </div>
          </div>
        ))}
      </div>
      <div className="carousel-controls">
        {slidesData.map((_, index) => (
          <button
            key={index}
            className={`carousel-dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;