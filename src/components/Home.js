import React from "react";
import Intro from "./Intro";
import Cardsection from "./Cardsection";
import Carousel from "./Carousel";
import '../css/home.css';

const Home = () => {
  return (
    <>
      <Carousel />
      <Intro />
      <div className="cards-section-container">
        <Cardsection />
      </div>
    </>
  );
};

export default Home;
