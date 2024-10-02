import React from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import carousel_1 from '../images/carousel_1 - Copy.webp';
import carousel_1_2x from '../images/carousel_1@2x.webp';  // Higher resolution for retina screens
import carousel_2 from '../images/carousel_2 - Copy.webp';
import carousel_2_2x from '../images/carousel_2@2x.webp';
import carousel_3 from '../images/carousel_3 - Copy.webp';
import carousel_3_2x from '../images/carousel_3@2x.webp';

const CarouselContainer = styled.div`
  margin: 40px 0;
`;

const Slide = styled.div`
  position: relative;
  color: white;
  overflow: hidden;

  img {
    width: 100vw;
    height: 40vh;
    border-radius: 10px;
    object-fit: cover;
    aspect-ratio: 16 / 9; // Maintain a 16:9 aspect ratio

  }

  h2 {
    position: absolute;
    bottom: 20px;
    left: 20px;
    margin: 0;
    font-size: 24px;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 10px 20px;
    border-radius: 5px;

    @media (max-width: 768px) {
      font-size: 14px;
    }
  }
`;
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
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <CarouselContainer>
      <Slider {...settings}>
        {slidesData.map((slide, index) => (
          <Slide key={index}>
            <img
              src={slide.imageSrc} 
              srcSet={slide.imageSrcSet}
              alt={`Slide ${index + 1}`}
              loading="lazy"
            />
            <h2>{slide.heading}</h2>
          </Slide>
        ))}
      </Slider>
    </CarouselContainer>
  );
};

export default Carousel;
