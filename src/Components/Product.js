import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateHistory, updateUserFavorites } from '../Actions/userActions';
import { formatNumber } from '../Utils/Utilities';
import Rating from './Rating';

const Product = ({
  product,
  user,
  noHover,
  smallRating,
  removeBtn,
  setItemDeleting,
}) => {
  const { _id, name, cover, price, reviews } = product;
  let productTotalRating = 0;
  let numReviews = 0;
  reviews.forEach((review) => {
    productTotalRating += review.rating;
    numReviews++;
  });
  const rating = productTotalRating / numReviews;
  const userUpdateFavs = useSelector((state) => state.userUpdateFavs);
  const { error } = userUpdateFavs;
  const dispatch = useDispatch();
  const [changeHeart, setChangeHeart] = useState(
    user &&
      user.userData &&
      user.userData.favorites &&
      user.userData.favorites.find((fav) => fav === _id)
      ? true
      : false
  );
  useEffect(() => {
    if (
      user &&
      user.userData &&
      user.userData.favorites &&
      user.userData.favorites.filter((fav) => fav === _id).length === 1
    ) {
      setChangeHeart(true);
    } else {
      setChangeHeart(false);
    }
    if (error) {
      setChangeHeart(false);
    }
  }, [user, _id, error]);
  return (
    <div className={'card' + (noHover ? ' opened' : '')} key={_id}>
      <div className='favorite-btn'>
        <a
          href={'/login?loginType=favorito&item_id=' + _id}
          onClick={(e) => {
            if (user) {
              e.preventDefault();
              dispatch(updateUserFavorites({ _id: _id, noDelete: false }));
              setChangeHeart(!changeHeart);
            }
          }}
        >
          {user ? (
            changeHeart ? (
              <i className='fas fa-heart'></i>
            ) : (
              <i className='far fa-heart'></i>
            )
          ) : (
            <i className='far fa-heart'></i>
          )}
        </a>
      </div>
      <Link className='nodecoration card-link' key={_id} to={'/product/' + _id}>
        <img className='card-img center-cropped' src={cover} alt={name} />
        <div className='card-body'>
          <div className='row top card-price'>
            <div className='price'>$ {formatNumber(price)}</div>
          </div>
          <div className='name-module'>
            <p className='product-name'>{name}</p>
          </div>
          {noHover && numReviews > 0 && (
            <Rating
              rating={rating && rating}
              numReviews={numReviews && numReviews}
              small={smallRating}
            ></Rating>
          )}
        </div>
      </Link>
      {removeBtn && (
        <button
          className='anchor-lookalike'
          onClick={() => {
            dispatch(updateHistory(_id, 'remove'));
            setItemDeleting(_id);
          }}
        >
          Eliminar
        </button>
      )}
    </div>
  );
};

export default Product;
