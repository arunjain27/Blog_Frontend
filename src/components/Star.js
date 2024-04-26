import React from 'react'

const Star = ({onClickStar,isSelected}) => {
  console.log(1);
    return (
   
    
    <span onClick={onClickStar} style={{ color: isSelected ? 'orange' : 'gray' }}>
          ★
        
        </span>
      
  );
}

export default Star
