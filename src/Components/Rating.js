import React from 'react';

const Rating = ({ rating, numReviews, small }) => {
  return (
    <div className='rating'>
      {numReviews > 0 && (
        <>
          <span key={0}>
            <i
              className={
                rating >= 1
                  ? 'fas fa-star'
                  : rating >= 0.5
                  ? 'fas fa-star-half-alt'
                  : 'far fa-star'
              }
            ></i>
          </span>
          <span key={1}>
            <i
              className={
                rating >= 2
                  ? 'fas fa-star'
                  : rating >= 1.5
                  ? 'fas fa-star-half-alt'
                  : 'far fa-star'
              }
            ></i>
          </span>
          <span key={2}>
            <i
              className={
                rating >= 3
                  ? 'fas fa-star'
                  : rating >= 2.5
                  ? 'fas fa-star-half-alt'
                  : 'far fa-star'
              }
            ></i>
          </span>
          <span key={3}>
            <i
              className={
                rating >= 4
                  ? 'fas fa-star'
                  : rating >= 3.5
                  ? 'fas fa-star-half-alt'
                  : 'far fa-star'
              }
            ></i>
          </span>
          <span key={4}>
            <i
              className={
                rating >= 5
                  ? 'fas fa-star'
                  : rating >= 4.5
                  ? 'fas fa-star-half-alt'
                  : 'far fa-star'
              }
            ></i>
          </span>
        </>
      )}
      <span key={0} className={small ? 'subtle-text' : ''}>
        {numReviews +
          (!small &&
            (numReviews > 1 || numReviews === 0 ? ' opiniones' : ' opinion'))}
      </span>
    </div>
  );
};

export default Rating;
