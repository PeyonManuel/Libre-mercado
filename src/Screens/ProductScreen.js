import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import MessageBox from '../Components/MessageBox';
import { detailsProduct } from '../Actions/productActions';
import Rating from '../Components/Rating';
import { formatNumber } from '../Utils/Utilities';
import { updateUserFavorites } from '../Actions/userActions';
import LoadingCircle from '../Components/LoadingCircle';

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
  const [videoSelected, setVideoSelected] = useState(false);
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

  const carouselContainerRef = useRef();

  useEffect(() => {
    console.log(carouselContainerRef);
  }, [carouselContainerRef]);

  useEffect(() => {
    if (carouselContainerRef.current) {
      let initialPosition = null;
      let moving = false;
      let transform = 0;
      let diff = 0;
      const carouselLimit =
        product &&
        (product.images.length - 1) * -carouselContainerRef.current.scrollWidth;
      const getStartPosition = (e) => {
        if (e.target.className === 'center-cropped big') {
          initialPosition = e.pageX;
          moving = true;
          const transformMatrix =
            document.querySelector('.track') &&
            window
              .getComputedStyle(document.querySelector('.track'))
              .getPropertyValue('transform');
          if (transformMatrix !== 'none') {
            transform = transformMatrix
              ? parseInt(transformMatrix.split(',')[4].trim())
              : 0;
          }
        }
      };
      const getCurrentPoition = (e) => {
        if (moving && product) {
          const currentPosition = e.pageX;
          diff = transform + (currentPosition - initialPosition);
          document.querySelector('.track').style.transform =
            'translateX(' + diff + 'px)';
        }
      };
      const getMouseUp = () => {
        moving = false;
        if (diff < carouselLimit) {
          document.querySelector('.track').style.transform =
            'translateX(' + carouselLimit + 'px)';
        } else if (diff > 0) {
          document.querySelector('.track').style.transform =
            'translateX(' + 0 + 'px)';
        } else if (diff % carouselContainerRef.current.scrollWidth !== 0) {
          document.querySelector('.track').style.transform =
            'translateX(' +
            Math.round(diff / carouselContainerRef.current.scrollWidth) *
              carouselContainerRef.current.scrollWidth +
            'px)';
        }
      };
      if (window.PointerEvent) {
        window.addEventListener('pointerdown', getStartPosition);
        window.addEventListener('pointermove', getCurrentPoition);
        window.addEventListener('pointerup', getMouseUp);
      } else {
        window.addEventListener('touchdown', getStartPosition);
        window.addEventListener('touchmove', getCurrentPoition);
        window.addEventListener('touchup', getMouseUp);
      }

      return () => {
        if (window.PointerEvent) {
          window.removeEventListener('pointerdown', getStartPosition);
          window.removeEventListener('pointermove', getCurrentPoition);
          window.removeEventListener('pointerup', getMouseUp);
        } else {
          window.removeEventListener('touchdown', getStartPosition);
          window.removeEventListener('touchmove', getCurrentPoition);
          window.removeEventListener('touchup', getMouseUp);
        }
      };
    }
    // eslint-disable-next-line
  });

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
        <LoadingCircle color='blue' />
      ) : error ? (
        <MessageBox variant='danger'>{error}</MessageBox>
      ) : (
        product && (
          <div
            className='column'
            style={{
              margin: window.devicePixelRatio <= 2 ? '3rem' : '1rem 0',
              width: '100%',
            }}
          >
            <span>
              {'| '}
              <a href={'/categorias/' + product.category.name}>
                {product.category.name}
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
                            onMouseOver={() => {
                              setVideoSelected(false);
                              setSelectedImg(i);
                            }}
                          ></img>
                        ))}
                      {product.images.length < 8 && product.video && (
                        <img
                          key='video'
                          className={
                            'img miniature-selector' +
                            (videoSelected ? ' selected' : '')
                          }
                          src='https://svgshare.com/i/WY_.svg'
                          alt='Miniature preview'
                          onMouseOver={() => {
                            setSelectedImg(-1);
                            setVideoSelected(true);
                          }}
                        ></img>
                      )}
                    </div>
                    <div
                      className='flex-center'
                      style={{ width: '85%', height: '48rem' }}
                    >
                      {selectedImg >= 0 ? (
                        <img
                          className='product-image'
                          src={
                            product &&
                            product.images &&
                            product.images[selectedImg]
                          }
                          alt='Selected product'
                        ></img>
                      ) : (
                        videoSelected && (
                          <iframe
                            className='margin-top'
                            title='Video seleccionado'
                            src={product.video}
                            allow='autoplay; encrypted-media'
                            frameBorder='0'
                            height='380px'
                            width='100%'
                          ></iframe>
                        )
                      )}
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
                      {product.isStateNew && product.isStateNew
                        ? 'Nuevo'
                        : 'Usado'}
                    </span>
                  </div>
                  <div>
                    <h1 className='break' style={{ margin: '0' }}>
                      {product.name && product.name}
                    </h1>
                  </div>
                  <div>
                    <Rating
                      rating={product.rating && product.rating}
                      numReviews={product.numReviews && product.numReviews}
                    ></Rating>
                  </div>
                  {window.devicePixelRatio >= 2 && (
                    <div
                      className='carousel-container width-100 margin-top'
                      ref={carouselContainerRef}
                    >
                      {carouselContainerRef.current && (
                        <div className='carousel'>
                          <div
                            className='track row'
                            style={{
                              width:
                                (product.images.length *
                                  carouselContainerRef.current.scrollWidth) /
                                  10 +
                                'rem',
                            }}
                          >
                            {product.images.map((img) => (
                              <div className='carousel-card'>
                                <img
                                  src={img}
                                  alt='product'
                                  className='center-cropped big'
                                  draggable='false'
                                ></img>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  <div className='column'>
                    {product.isOnSale && (
                      <del className='saleprice'>
                        $ {product.salePrice && product.salePrice}
                      </del>
                    )}
                    <div className='row'>
                      <span className='price big row'>
                        $ {product.price && formatNumber(product.price)}{' '}
                      </span>
                      {product.isOnSale && (
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
                      {product.seller && (
                        <Link to={'/user/' + product.seller._id}>
                          {product.seller.userName}
                        </Link>
                      )}
                    </span>
                  </div>
                  <div>
                    {product.stock && product.stock === 0 ? (
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
                              qtyListDropdown(product.stock).map(
                                (item) => item
                              )}
                          </ul>
                        </span>
                      </div>
                    )}
                  </div>
                  <div className='column width-100'>
                    <button className='primary block'>Comprar ahora</button>
                    <button className='secondary block margin-top'>
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
        )
      )}
    </>
  );
};

export default ProductScreen;
