import React, { useEffect, useRef } from 'react';
import '../css/intro.css';
import Intro_1 from '../images/Intro_1 - Copy.webp';
import Intro_1_2x from '../images/Intro_1@2x.webp';
import Intro_2 from '../images/Intro_2 - Copy.webp';
import Intro_2_2x from '../images/Intro_2@2x.webp';

const Intro = () => {
  const introObj = [
    {
      imageSrc: Intro_1,
      imageSrcSet: `${Intro_1} 1x, ${Intro_1_2x} 2x`,
      heading: 'Join the Conversation: Share Your Expertise and Experiences',
      paragraph: 'Express your thoughts, share your knowledge, and inspire others by joining our community of bloggers. Your voice matters here!',
    },
    {
      imageSrc: Intro_2,
      imageSrcSet: `${Intro_2} 1x, ${Intro_2_2x} 2x`,
      heading: 'Become a Blogging Star: Share Your Thoughts with the World',
      paragraph: 'Reach out to a wider audience and connect with readers who share your interests. Start publishing your blogs today!',
    },
  ];

  const sectionRefs = useRef([]);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    sectionRefs.current.forEach(section => {
      if (section) observer.observe(section);
    });

    return () => {
      sectionRefs.current.forEach(section => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  return (
    <>
      {introObj.map((slide, index) => (
        <section 
          key={index} 
          className="intro-section"
          ref={el => sectionRefs.current[index] = el}
        >
          <div className="intro-content">
            <h2>{slide.heading}</h2>
            <p>{slide.paragraph}</p>
          </div>
          <div className="intro-image-wrapper">
            <img
              src={slide.imageSrc}
              srcSet={slide.imageSrcSet}
              alt={`Blog ${index + 1}`}
              loading={index === 0 ? 'eager' : 'lazy'}
            />
          </div>
        </section>
      ))}
    </>
  );
};

export default Intro;
