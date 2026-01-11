import React from "react";
import Intro from "./Intro";
import Cardsection from "./Cardsection";
import Carousel from "./Carousel";
import '../css/home.css';

const Home = () => {
  return (
    <div className="home-page">
      <Carousel />
      <div className="home-intro-wrapper">
        <Intro />
      </div>
      <div className="cards-section-container"> 
        <Cardsection />
      </div>
    </div>
  );
};

export default Home;
