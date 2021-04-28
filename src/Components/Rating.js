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
                  ? 'fa fa-star'
                  : rating >= 0.5
                  ? 'fa fa-star-half-o'
                  : 'fa fa-star-0'
              }
            ></i>
          </span>
          <span key={1}>
            <i
              className={
                rating >= 2
                  ? 'fa fa-star'
                  : rating >= 1.5
                  ? 'fa fa-star-half-o'
                  : 'fa fa-star-0'
              }
            ></i>
          </span>
          <span key={2}>
            <i
              className={
                rating >= 3
                  ? 'fa fa-star'
                  : rating >= 2.5
                  ? 'fa fa-star-half-o'
                  : 'fa fa-star-0'
              }
            ></i>
          </span>
          <span key={3}>
            <i
              className={
                rating >= 4
                  ? 'fa fa-star'
                  : rating >= 3.5
                  ? 'fa fa-star-half-o'
                  : 'fa fa-star-0'
              }
            ></i>
          </span>
          <span key={4}>
            <i
              className={
                rating >= 5
                  ? 'fa fa-star'
                  : rating >= 4.5
                  ? 'fa fa-star-half-o'
                  : 'fa fa-star-0'
              }
            ></i>
          </span>
        </>
      )}
      <span key={0} className={small ? 'subtle-text' : ''}>
        {numReviews + (!small && ' opiniones')}
      </span>
    </div>
  );
};

export default Rating;
