import React, { useState } from 'react';
import Star from './Star';

const Review = () => {

        // 'currentRating' holds the number of selected stars.
        const [currentRating, setCurrentRating] = useState(0);
      
        // This function is called when a star is clicked.
        // It sets the 'currentRating' to the number of the star that was clicked.
        const handleClick = (starNumber) => {
          setCurrentRating(starNumber);
        };
      
        return (
          <div>
            <h2>Rate Your Experience</h2>
            {/* We create 5 Star components here. */}
            {
              [1, 2, 3, 4, 5].map((starNumber) => (
              <Star
                key={starNumber}
                isSelected={starNumber<= currentRating}
             
                onClickStar={() => handleClick(starNumber)}
              />
            ))}
          </div>
    
    );
};

export default Review;
