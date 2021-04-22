import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import MessageBox from '../Components/MessageBox';
import { detailsProduct } from '../Actions/productActions';
import Rating from '../Components/Rating';
import { formatNumber } from '../Utils/Utilities';
import { updateUserFavorites } from '../Actions/userActions';

const ProductScreen = (props) => {
  const dispatch = useDispatch();
  const productId = props.match.params.id;
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const userLogin = useSelector((state) => state.userLogin);
  const { user } = userLogin;
  const userUpdateFavs = useSelector((state) => state.userUpdateFavs);
  const { error: favError } = userUpdateFavs;
  const [selectedImg, setSelectedImg] = useState(0);
  const [selectedQty, setSelectedQty] = useState(1);
  const [qtyBtnClicked, setQtyBtnClicked] = useState(false);
  const [moreThan6BtnClicked, setMoreThan6BtnClicked] = useState(false);
  const [noStock, setNoStock] = useState(false);
  const [moreQty, setMoreQty] = useState('');
  const [changeHeart, setChangeHeart] = useState(
    user &&
      user.userData &&
      user.userData.favorites &&
      product &&
      product._id &&
      user.userData.favorites.find((fav) => fav._id === product._id)
      ? true
      : false
  );
  useEffect(() => {
    dispatch(detailsProduct(productId));
  }, [dispatch, productId]);
  useEffect(() => {
    if (
      user &&
      product &&
      product._id &&
      user.userData.favorites.filter((fav) => fav._id === product._id)
        .length === 1
    ) {
      setChangeHeart(true);
    } else {
      setChangeHeart(false);
    }
    if (favError) {
      setChangeHeart(false);
    }
  }, [user, product, favError]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const { current: wrap } = wrapperRef;
      if (wrap && !wrap.contains(event.target) && qtyBtnClicked) {
        setQtyBtnClicked(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [qtyBtnClicked]);
  const wrapperRef = useRef(null);

  const qtyListDropdown = (stock) => {
    const list = [];
    for (let i = 1; i <= stock; i++) {
      if (i <= 6)
        list.push(
          <li
            key={i}
            className={i === selectedQty ? 'current' : ''}
            onClick={() => {
              setSelectedQty(i);
              setQtyBtnClicked(!qtyBtnClicked);
              setMoreThan6BtnClicked(false);
              setNoStock(false);
              setMoreQty('');
            }}
          >
            {i + (i === 1 ? ' unidad' : ' unidades')}
          </li>
        );
      if (i === 7)
        list.push(
          <li
            className={moreThan6BtnClicked ? 'last-item' : ''}
            onClick={() => {
              !moreThan6BtnClicked && setMoreThan6BtnClicked(true);
            }}
          >
            <span className={moreThan6BtnClicked ? 'hidden' : ''}>
              Más de 6 unidades
            </span>
            <span
              className={'row' + (moreThan6BtnClicked ? '' : ' hidden')}
              style={{ width: '11.1rem' }}
            >
              <label className={noStock ? 'nostock' : ''} htmlFor='qtynumber'>
                Cantidad
              </label>
              <input
                className={noStock ? 'nostock' : ''}
                id='qtynumber'
                type='number'
                min='1'
                max={product.stock}
                value={moreQty}
                onKeyDown={(e) => {
                  setNoStock(false);
                  if (
                    e.keyCode === 189 ||
                    (e.target.value === '' && e.keyCode === 48)
                  )
                    e.preventDefault();
                  if (e.keyCode === 13) {
                    if (moreQty && moreQty <= product.stock) {
                      setSelectedQty(moreQty);
                      setQtyBtnClicked(!qtyBtnClicked);
                      setMoreThan6BtnClicked(false);
                      setNoStock(false);
                    } else {
                      setNoStock(true);
                    }
                  }
                }}
                onChange={(e) => setMoreQty(e.target.value)}
              ></input>
              <button
                type='button'
                onClick={() => {
                  if (moreQty && moreQty <= product.stock) {
                    setSelectedQty(moreQty);
                    setQtyBtnClicked(!qtyBtnClicked);
                    setMoreThan6BtnClicked(false);
                    setNoStock(false);
                  } else {
                    setNoStock(true);
                  }
                }}
              >
                <i className='fa fa-caret-right'></i>
              </button>
            </span>
          </li>
        );
    }
    return list;
  };
  return (
    <>
      {loading ? (
        <></>
      ) : error ? (
        <MessageBox variant='danger'>{error}</MessageBox>
      ) : (
        <div
          className='column'
          style={{
            margin: window.devicePixelRatio < 2 ? '3rem' : '1rem 0',
            gap: '1rem',
          }}
        >
          <span>
            {'| '}
            <a href={'/categorias/' + product && product.category.name}>
              {product && product.category.name}
            </a>
          </span>
          <div className='column screen-card'>
            <div className='top screen-segment first'>
              {window.devicePixelRatio < 2 && (
                <div className='row top product-col-1'>
                  <div className='miniature-images column'>
                    {product &&
                      product.images &&
                      product.images.map((img, i) => (
                        <img
                          key={i}
                          className={
                            'img miniature-selector' +
                            (selectedImg === i ? ' selected' : '')
                          }
                          src={img}
                          alt='Miniature preview'
                          onMouseOver={() => setSelectedImg(i)}
                        ></img>
                      ))}
                  </div>
                  <div style={{ position: 'relative' }}>
                    <img
                      className='product-image'
                      src={
                        product && product.images && product.images[selectedImg]
                      }
                      alt='Selected product'
                    ></img>
                  </div>
                  <div
                    className='column'
                    style={{ maxWidth: '35rem', gap: '0.5rem' }}
                  ></div>
                </div>
              )}
              <div
                className='column top product-col-2 screen-mini-card'
                style={{ gap: '1rem' }}
              >
                <div className='favorite-btn product-screen'>
                  <a
                    href={'/login?loginType=FAVORITE&item_id=' + product._id}
                    onClick={(e) => {
                      if (user) {
                        e.preventDefault();
                        dispatch(
                          updateUserFavorites({
                            _id: product._id,
                            noDelete: false,
                          })
                        );
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
                <div>
                  <span className='subtle-text'>
                    {product && product.isStateNew && product.isStateNew
                      ? 'Nuevo'
                      : 'Usado'}
                  </span>
                </div>
                <div>
                  <h1 className='break' style={{ margin: '0' }}>
                    {product && product.name && product.name}
                  </h1>
                </div>
                <div>
                  <Rating
                    rating={product && product.rating && product.rating}
                    numReviews={
                      product && product.numReviews && product.numReviews
                    }
                  ></Rating>
                </div>
                {window.devicePixelRatio > 1 && (
                  <div className='carousel-container'>
                    <div className='carousel'>
                      <div className='track'>
                        {product.images.map((img) => (
                          <div className='carousel-card'>
                            <img
                              src={img}
                              alt='product'
                              className='center-cropped'
                            ></img>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                <div className='column'>
                  {product && product.isOnSale && (
                    <del className='saleprice'>
                      $ {product && product.salePrice && product.salePrice}
                    </del>
                  )}
                  <div className='row'>
                    <span className='price big row'>
                      ${' '}
                      {product && product.price && formatNumber(product.price)}{' '}
                    </span>
                    {product && product.isOnSale && (
                      <span className='discount big'>
                        {product &&
                          product.salePrice &&
                          product.price &&
                          Math.floor(
                            (1 - product.salePrice / product.price) * 100
                          )}
                        % OFF
                      </span>
                    )}
                  </div>
                </div>
                <div>
                  <span className='seller-link'>
                    Vendido por{' '}
                    {product && product.seller && (
                      <Link to={'/user/' + product.seller._id}>
                        {product.seller.userName}
                      </Link>
                    )}
                  </span>
                </div>
                <div>
                  {product && product.stock && product.stock === 0 ? (
                    <MessageBox variant='danger'>
                      Producto fuera de stock
                    </MessageBox>
                  ) : product.stock === 1 ? (
                    <div>
                      <h2>¡Último disponible!</h2>
                    </div>
                  ) : (
                    <div>
                      <h2>Stock disponible</h2>
                      <span className='btn-dropdown-qty' ref={wrapperRef}>
                        <button
                          className='qty'
                          onClick={() => {
                            setQtyBtnClicked(!qtyBtnClicked);
                          }}
                        >
                          <span>{'Cantidad: '}</span>
                          <span className='selected-qty'>
                            {selectedQty +
                              (selectedQty === 1 ? ' unidad' : ' unidades')}
                          </span>{' '}
                          <span>
                            <i
                              className={
                                'fa fa-caret-down qty-caret' +
                                (qtyBtnClicked ? ' selected' : '')
                              }
                            ></i>
                          </span>
                          <span
                            className='subtle-text'
                            style={{ fontWeight: '100' }}
                          >
                            {' (' + product.stock + ' disponibles)'}
                          </span>
                        </button>
                        <ul
                          className={
                            'qty-list' + (qtyBtnClicked ? ' active' : '')
                          }
                        >
                          {product &&
                            product.stock &&
                            qtyListDropdown(product.stock).map((item) => item)}
                        </ul>
                      </span>
                    </div>
                  )}
                </div>
                <div className='column' style={{ width: '100%', gap: '1rem' }}>
                  <button className='primary block'>Comprar ahora</button>
                  <button className='secondary block'>
                    Agregar al carrito
                  </button>
                </div>
              </div>
            </div>

            <div className='screen-segment second'>
              <div>
                <h1 style={{ fontSize: '2.4rem' }}>Descripción</h1>
                <pre className='product-description width-100'>
                  {/* {product && product.description && product.description} */}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductScreen;
