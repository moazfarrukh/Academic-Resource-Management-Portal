import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const Rating = ({ rating, onRatingChange }) => {
  const [hoverRating, setHoverRating] = useState(0);

  const handleMouseEnter = (index) => {
    setHoverRating(index);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  return (
    <div>
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;
        return (
          <FaStar
            key={index}
            size={25}
            color={(hoverRating || rating) >= starValue ? 'gold' : 'gray'}
            onMouseEnter={() => handleMouseEnter(starValue)}
            onMouseLeave={handleMouseLeave}
            onClick={() => onRatingChange(starValue)}
            style={{ cursor: 'pointer' }}
          />
        );
      })}
    </div>
  );
};

export default Rating;
