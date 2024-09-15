import React, { memo } from 'react';
import styled from 'styled-components';
import Intro_1 from '../images/Intro_1.jpg';
import Intro_2 from '../images/Intro_2.jpg';

const ContentWithImageContainer = styled.section`
  display: flex;
  align-items: center;
  margin: 40px 0;
  background-color: #f9f9f9;
  border-radius: 10px;
  overflow: hidden;
  height: 60vh;

  @media (max-width: 768px) {
    flex-direction: column;
    height: 40vh;
  }
`;

const Content = styled.div`
  flex: 1;
  padding: 20px;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const ImageWrapper = styled.div`
  flex: 1;
  max-width: 50%;
  padding: 20px;

  @media (max-width: 768px) {
    max-width: 100%;
    padding: 10px;
  }

  img {
    width: 100%;
    height: auto;
    border-radius: 10px;
    object-fit: cover;
  }
`;

const ContentWithImage = memo(() => {
  const IntroObj = [
    {
      image: Intro_1,
      heading: 'Join the Conversation: Share Your Expertise and Experiences',
      paragraph: 'Express your thoughts, share your knowledge, and inspire others by joining our community of bloggers. Your voice matters here!',
    },
    {
      image: Intro_2,
      heading: 'Become a Blogging Star: Share Your Thoughts with the World',
      paragraph: 'Reach out to a wider audience and connect with readers who share your interests. Start publishing your blogs today!',
    },
  ];

  return (
    <>
      {IntroObj.map((slide, index) => (
        <ContentWithImageContainer key={index} style={{ backgroundColor: 'rgb(235, 244, 245)', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'}}>
          <Content>
            <h2>{slide.heading}</h2>
            <p>{slide.paragraph}</p>
          </Content>
          <ImageWrapper>
            <img src={slide.image} alt={`Blog ${index + 1}`} />
          </ImageWrapper>
        </ContentWithImageContainer>
      ))}
    </>
  );
});

export default ContentWithImage;
