import React from 'react';

const Rating = ({ rating, numReviews }) => {
  return (
    <div className='rating'>
      {numReviews > 0 && (
        <>
          <span>
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
          <span>
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
          <span>
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
          <span>
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
          <span>
            <i
              className={
                rating >= 5
                  ? 'fa fa-star'
                  : rating >= 4.5
                  ? 'fa fa-star-half-o'
                  : 'fa fa-star-0'
              }
            ></i>
          </span>{' '}
        </>
      )}
      <span>{numReviews + ' opiniones'}</span>
    </div>
  );
};

export default Rating;
