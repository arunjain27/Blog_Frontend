import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
const Intro = React.lazy(() => import("./Intro"));
const Cardsection = React.lazy(() => import("./Cardsection"));
const Carousel = React.lazy(() => import("./Carousel"));

const Home = () => {

  return (
    <>
       <React.Suspense fallback={<div>Loading...</div>}>
      <Carousel/>
      <Intro/> 
     
   <div style={{display:'flex',justifyContent:'center'}}>
      <Cardsection/>
      </div>
      </React.Suspense>
       </>
  );
};

export default Home;
