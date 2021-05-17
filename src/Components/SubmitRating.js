import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProduct } from '../Actions/productActions';

const Rating = ({ product, userRating, userId }) => {
  const dispatch = useDispatch();
  const productUpdate = useSelector((state) => state.productUpdate);
  const [localUserRating, setLocalUserRating] = useState(userRating);
  const {
    loading: loadingProductUpdate,
    error: productUpdateError,
  } = productUpdate;
  useEffect(() => {
    productUpdateError && setLocalUserRating((userRating) => userRating);
  }, [productUpdateError]);
  const updateReviews = (newRating) => {
    const oldUserReview = product.reviews.find(
      (review) => review.user.toString() === userId.toString()
    );
    const newReviews = (product.reviews[
      product.reviews.indexOf(oldUserReview)
    ] = { user: userId, rating: newRating });
    dispatch(updateProduct({ _id: product._id, reviews: newReviews }));
    setLocalUserRating(newRating);
  };
  return (
    <div className='column flex-center'>
      <h5 className='submit-rating-title'>Valorar el producto</h5>
      <div className='rating submit'>
        <span
          key={0}
          onClick={() => {
            if (!loadingProductUpdate) {
              updateReviews(1);
            }
          }}
        >
          <i
            className={
              localUserRating >= 1
                ? 'fas fa-star'
                : localUserRating >= 0.5
                ? 'fas fa-star-half-alt'
                : 'far fa-star'
            }
          ></i>
        </span>
        <span
          key={1}
          onClick={() => {
            if (!loadingProductUpdate) {
              updateReviews(2);
            }
          }}
        >
          <i
            className={
              localUserRating >= 2
                ? 'fas fa-star'
                : localUserRating >= 1.5
                ? 'fas fa-star-half-alt'
                : 'far fa-star'
            }
          ></i>
        </span>
        <span
          key={2}
          onClick={() => {
            if (!loadingProductUpdate) {
              updateReviews(3);
            }
          }}
        >
          <i
            className={
              localUserRating >= 3
                ? 'fas fa-star'
                : localUserRating >= 2.5
                ? 'fas fa-star-half-alt'
                : 'far fa-star'
            }
          ></i>
        </span>
        <span
          key={3}
          onClick={() => {
            if (!loadingProductUpdate) {
              updateReviews(4);
            }
          }}
        >
          <i
            className={
              localUserRating >= 4
                ? 'fas fa-star'
                : localUserRating >= 3.5
                ? 'fas fa-star-half-alt'
                : 'far fa-star'
            }
          ></i>
        </span>
        <span
          key={4}
          onClick={() => {
            if (!loadingProductUpdate) {
              updateReviews(5);
            }
          }}
        >
          <i
            className={
              localUserRating >= 5
                ? 'fas fa-star'
                : localUserRating >= 4.5
                ? 'fas fa-star-half-alt'
                : 'far fa-star'
            }
          ></i>
        </span>
      </div>
    </div>
  );
};

export default Rating;
