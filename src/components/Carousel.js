import React from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import carousel_1 from '../images/carousel_1.jpg';
import carousel_2 from '../images/carousel_2.jpg';
import carousel_3 from '../images/carousel_3.jpg';

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
    image: carousel_1,
    heading: 'Share Your Voice: Join Our Community of Passionate Bloggers',
  },
  {
    image: carousel_2,
    heading: 'Be Heard: Publish Your Blogs and Connect with Like-Minded Readers',
  },
  {
    image: carousel_3,
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
            <img src={slide.image} alt={`Slide ${index + 1}`} />
            <h2>{slide.heading}</h2>
          </Slide>
        ))}
      </Slider>
    </CarouselContainer>
  );
};

export default Carousel;
