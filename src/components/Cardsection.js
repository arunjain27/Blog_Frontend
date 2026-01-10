import React from 'react';
import { Link } from 'react-router-dom';
import '../css/cardsection.css';

const Cardsection = () => {
  return (
    <div className="card-section">
      <div className="card-section-header">Discover the Latest Insights</div>
      <div className="card-section-body">
        <div className="card-section-title">Ready to fuel your curiosity and ignite your imagination?</div>
        <p className="card-section-text">Look no further! Our latest collection of blogs is here to captivate, inspire, and entertain.</p>
        <Link to='/Allblog' className="card-section-button">Latest Updates</Link>
      </div>
    </div>
  );
};

export default Cardsection;
