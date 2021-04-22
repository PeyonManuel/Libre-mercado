import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateUserFavorites } from '../Actions/userActions';
import { formatNumber } from '../Utils/Utilities';

const Product = ({ product, user }) => {
  const { _id, name, images, price, salePrice, isOnSale } = product;
  const userUpdateFavs = useSelector((state) => state.userUpdateFavs);
  const { error } = userUpdateFavs;
  const dispatch = useDispatch();
  const [changeHeart, setChangeHeart] = useState(
    user &&
      user.userData &&
      user.userData.favorites &&
      user.userData.favorites.find((fav) => fav._id === _id)
      ? true
      : false
  );
  useEffect(() => {
    if (
      user &&
      user.userData &&
      user.userData.favorites &&
      user.userData.favorites.filter((fav) => fav._id === _id).length === 1
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
    <div className='card' style={{ margin: '0' }} key={_id}>
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
        <img className='card-img center-cropped' src={images[0]} alt={name} />
        <div className='card-body'>
          {isOnSale ? (
            <div className='sale-price-module row top'>
              <div className='sale-price'>$ {formatNumber(salePrice)}</div>
              <div className='discount small-screen'>
                {Math.floor((1 - salePrice / price) * 100)}% OFF
              </div>
            </div>
          ) : (
            <div className='small-original-price-module'>
              <div className='sale-price'>$ {formatNumber(price)}</div>
            </div>
          )}
          <div className='row top card-price'>
            <div className='price'>$ {formatNumber(price)}</div>
            {isOnSale && (
              <div className='discount' style={{ right: '2.5rem' }}>
                {Math.floor((1 - salePrice / price) * 100)}% OFF
              </div>
            )}
          </div>
          <div className='name-module'>
            <p className='product-name'>{name}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Product;
