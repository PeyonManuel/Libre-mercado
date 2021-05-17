import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listByIdsProducts } from '../../Actions/productActions';
import {
  deleteNotificationUser,
  updateCart,
  updateUserFavorites,
} from '../../Actions/userActions';
import {
  desktopScreenCondition,
  formatDate,
  formatNumber,
} from '../../Utils/Utilities';
import CategoriesDropdownList from '../CategoriesDropdownList';
import LoadingCircle from '../LoadingCircle';
import MessageBox from '../MessageBox';

const Header = (props) => {
  useEffect(() => {
    document.querySelector('.grid-container').classList.remove('less-header');
  }, []);
  const urlParams = new URLSearchParams(props.location.search);
  const categoryParam = urlParams.get('categoria');
  const searchParam = urlParams.get('busqueda');
  const stateParam = urlParams.get('estado');
  const shippingParam = urlParams.get('con-envio');
  const minimumParam = urlParams.get('minimo');
  const maximumParam = urlParams.get('maximo');
  const userLogin = useSelector((state) => state.userLogin);
  const { user } = userLogin;
  const userUpdateFavs = useSelector((state) => state.userUpdateFavs);
  const {
    error,
    loading: loadingUpdateFavs,
    user: userFavsUpdated,
  } = userUpdateFavs;
  const cartUpdate = useSelector((state) => state.cartUpdate);
  const {
    success: addToCartSuccess,
    loading: loadingAddToCart,
    error: errorAddingToCart,
  } = cartUpdate;
  const userDeleteNotification = useSelector(
    (state) => state.userDeleteNotification
  );
  const {
    loading: loadingDeleteNotification,
    error: errorDeletingNotification,
  } = userDeleteNotification;
  const idListProduct = useSelector((state) => state.idListProduct);
  const {
    loading: loadingIdList,
    error: idListError,
    products: idListProducts,
  } = idListProduct;
  const dispatch = useDispatch();
  const [localNotifications, setLocalNotifications] = useState(
    user && user.userData && user.userData.notifications
      ? user.userData.notifications
      : []
  );
  const [search, setSearch] = useState(searchParam ? searchParam : '');
  const [clickedAddToCart, setClickedAddToCart] = useState(false);
  const [userChanged, setUserChanged] = useState(false);

  useEffect(() => {
    setUserChanged(true);
  }, [user]);

  useEffect(() => {
    if (userFavsUpdated) {
      setUserChanged(false);
      if (userFavsUpdated.userData.favorites.length > 0) {
        // dispatch(
        //   listByIdsProducts(userFavsUpdated.userData.favorites.slice(0, 3))
        // );
      }
      if (userFavsUpdated.userData.favorites.length === 0) {
        dispatch({ type: 'PRODUCT_ID_LIST_RESET' });
      }
      dispatch({ type: 'UPDATE_USER_FAVORITES_RESET' });
    }
  }, [userFavsUpdated, dispatch]);

  useEffect(() => {
    switch (props.location.pathname) {
      case '/':
        document.querySelector('#inicio') &&
          document.querySelector('#inicio').classList.add('current');
        break;
      case '/notificaciones':
        document.querySelector('#notificaciones') &&
          document.querySelector('#notificaciones').classList.add('current');
        break;
      case '/mis-compras':
        document.querySelector('#compras') &&
          document.querySelector('#compras').classList.add('current');
        break;
      case '/mis-ventas':
        document.querySelector('#ventas') &&
          document.querySelector('#ventas').classList.add('current');
        break;
      case '/preguntas':
        document.querySelector('#preguntas') &&
          document.querySelector('#preguntas').classList.add('current');
        break;
      case '/publicaciones':
        document.querySelector('#publicaciones') &&
          document.querySelector('#publicaciones').classList.add('current');
        break;
      case '/favoritos':
        document.querySelector('#favoritos') &&
          document.querySelector('#favoritos').classList.add('current');
        break;
      case '/historial':
        document.querySelector('#historial') &&
          document.querySelector('#historial').classList.add('current');
        break;
      case '/vender':
        document.querySelector('#vender') &&
          document.querySelector('#vender').classList.add('current');
        break;
      case '/ayuda':
        document.querySelector('#ayuda') &&
          document.querySelector('#ayuda').classList.add('current');
        break;
      default:
        break;
    }
  }, [props]);
  useEffect(() => {
    if (
      (user && user.userData && user.userData.notifications) ||
      (user && user.userData && user.userData.notifications && error)
    ) {
      setLocalNotifications(user.userData.notifications);
    }
  }, [user, error]);

  useEffect(() => {
    if (addToCartSuccess && clickedAddToCart) {
      window.location.href = '/carrito';
      dispatch({ type: 'USER_CART_UPDATE_RESET' });
      setClickedAddToCart(false);
    }
  }, [addToCartSuccess, dispatch, user, clickedAddToCart]);

  var currentTime = new Date();

  const justMinutesFromDate = (date) => {
    return [
      date.split('T')[1].split(':')[0],
      date.split('T')[1].split(':')[1],
    ].join(':');
  };

  const removeMinutesFromDate = (date) => {
    return date.split('T')[0];
  };
  return (
    <header className='row flex-center'>
      <div
        style={{
          width: '120rem',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <div className='halfs'>
          <div className='row half left'>
            <div className='logo-container'>
              <a className='nodecoration' href='/'>
                <img
                  className='logo big-logo'
                  src='https://i.imgur.com/xDUqlt2.png'
                  alt='Mercado libre logo'
                ></img>
                <img
                  className='logo small-logo'
                  src='https://global-selling.mercadolibre.com/brandprotection/enforcement/images?src=meli-logo.png'
                  alt='Mercado libre logo'
                ></img>
              </a>
            </div>
            <div className='searchbar'>
              <input
                type='text'
                placeholder={
                  desktopScreenCondition
                    ? 'Buscar productos, marcas y mas...'
                    : 'Buscar'
                }
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.keyCode === 13 && search.length > 2) {
                    window.location.href =
                      '/productos?busqueda=' +
                      search +
                      (categoryParam ? '&categoria=' + categoryParam : '') +
                      (stateParam ? '&estado=' + !stateParam : '') +
                      (shippingParam ? '&con-envio=' + shippingParam : '') +
                      (minimumParam ? '&minimo=' + minimumParam : '') +
                      (maximumParam ? '&maximo=' + maximumParam : '');
                  }
                }}
              ></input>
              <a
                href={
                  search.length > 0
                    ? '/productos?busqueda=' +
                      search +
                      (categoryParam ? '&categoria=' + categoryParam : '') +
                      (stateParam ? '&estado=' + !stateParam : '') +
                      (shippingParam ? '&con-envio=' + shippingParam : '') +
                      (minimumParam ? '&minimo=' + minimumParam : '') +
                      (maximumParam ? '&maximo=' + maximumParam : '')
                    : '#short-search'
                }
                className='nodecoration'
              >
                <i className='fa fa-search'></i>
              </a>
            </div>

            <div className='row cart'>
              <div
                className='burger'
                onClick={(e) => {
                  document.querySelector('.burger').classList.toggle('toggle');
                  document
                    .getElementById('small-screen-nav-bar')
                    .classList.toggle('active');
                }}
              >
                <div className='line1'></div>
                <div className='line2'></div>
                <div className='line3'></div>
              </div>
              <a href='/carrito' className='nodecoration'>
                <i className='fa fa-shopping-cart fa-lg'></i>
              </a>
            </div>
          </div>
          <div
            className='row first-half half left'
            style={{ paddingTop: '1.5rem' }}
          >
            <div style={{ width: '14rem' }}></div>
            <CategoriesDropdownList />
          </div>
        </div>
        <ul className='row user-options half'>
          <li>
            {user ? (
              <div className='dropdown'>
                <a className='nodecoration' href='#user'>
                  <i className='fa fa-user  fa-lg margin-right'></i>{' '}
                  <p>{user.name}</p> <i className='fa fa-caret-down'></i>
                </a>
                <ul className='dropdown-content'>
                  <li>
                    <a className='nodecoration' href='/mis-datos'>
                      <i className='fa fa-user  fa-3x'></i>
                      <span>{' Hola ' + user.name}</span>
                    </a>
                  </li>
                  <li className='separator'>
                    <a className='nodecoration ' href='/mis-compras'>
                      Compras
                    </a>
                  </li>
                  <li>
                    <a className='nodecoration' href='/Preguntas'>
                      Preguntas
                    </a>
                  </li>
                  <li className='separator'>
                    <a className='nodecoration' href='/publicaciones'>
                      Publicaciones
                    </a>
                  </li>
                  <li>
                    <a className='nodecoration' href='/mis-ventas'>
                      Ventas
                    </a>
                  </li>
                  <li>
                    <a className='nodecoration separator' href='/mis-datos'>
                      Mis datos
                    </a>
                  </li>
                  <li className='separator'>
                    <a
                      className='nodecoration'
                      href={props.location.search}
                      onClick={() => {
                        localStorage.removeItem('userInfo');
                      }}
                    >
                      Salir
                    </a>
                  </li>
                </ul>
              </div>
            ) : (
              <a className='nodecoration' href='/register'>
                Creá tu cuenta{' '}
              </a>
            )}
          </li>
          {!user && (
            <li>
              <a className='nodecoration' href='/login'>
                Ingresá{' '}
              </a>
            </li>
          )}
          <li>
            <a className='nodecoration' href='/mis-compras'>
              Mis compras{' '}
            </a>
          </li>
          {user && window.location.href.split('/')[3] !== 'favoritos' && (
            <li>
              <div
                className='dropdown'
                onMouseOver={() => {
                  if (
                    ((!loadingIdList && !idListProducts) || userChanged) &&
                    user.userData.favorites.length > 0
                  ) {
                    setUserChanged(false);
                    dispatch(
                      listByIdsProducts(user.userData.favorites.slice(0, 3))
                    );
                  }
                }}
              >
                <a className='nodecoration' href='#favorites'>
                  {'Favoritos '}
                  <i className='fa fa-caret-down'></i>
                </a>
                <ul className='dropdown-content favorites'>
                  <li>
                    <h2 style={{ margin: '0' }}>Favoritos</h2>
                  </li>
                  {loadingAddToCart || loadingIdList || !idListProducts ? (
                    <LoadingCircle color='blue' padding={true} />
                  ) : idListError ? (
                    <MessageBox variant='danger'>
                      Ha ocurrido un error con los favoritos
                    </MessageBox>
                  ) : idListProducts && idListProducts.length >= 1 ? (
                    <>
                      {loadingUpdateFavs ? (
                        <LoadingCircle color='blue' padding={true} />
                      ) : error ? (
                        <MessageBox variant='danger'>
                          Ha ocurrido un error con los favoritos
                        </MessageBox>
                      ) : (
                        idListProducts.map((fav) => (
                          <li
                            className='separator'
                            key={fav._id}
                            style={{ position: 'relative' }}
                          >
                            <div className='delbtn-div'>
                              <button
                                onClick={() => {
                                  dispatch(
                                    updateUserFavorites({
                                      _id: fav._id,
                                      noDelete: false,
                                    })
                                  );
                                  dispatch({ type: 'PRODUCT_ID_LIST_RESET' });
                                }}
                              >
                                Eliminar
                              </button>
                            </div>
                            <div
                              className='row buybtns-div'
                              style={{ columnGap: '1rem' }}
                            >
                              <a
                                href={'/checkout/shipping'}
                                onClick={() => {
                                  if (fav.active && !fav.Finished) {
                                    localStorage.setItem(
                                      'localCheckout',
                                      JSON.stringify({
                                        products: [
                                          {
                                            _id: fav._id,
                                            seller: fav.seller,
                                            price: fav.price,
                                            quantity: 1,
                                          },
                                        ],
                                        editingAddress: false,
                                      })
                                    );
                                  }
                                  if (!fav.active || fav.Finished) {
                                    window.location.href = '/product' + fav._id;
                                  }
                                }}
                              >
                                Comprar
                              </a>
                              <a
                                className={errorAddingToCart ? 'red' : ''}
                                href='#añadir-al-carrito'
                                onClick={() => {
                                  dispatch(
                                    updateCart(
                                      {
                                        product: fav._id,
                                        quantity: 1,
                                      },
                                      'add'
                                    )
                                  );
                                  setClickedAddToCart(true);
                                }}
                              >
                                Agregar al carrito
                              </a>
                            </div>
                            <a
                              className='row top nodecoration'
                              href={'/product/' + fav._id}
                            >
                              <img
                                className='favimg'
                                src={fav.cover}
                                alt='product'
                              ></img>
                              <div className='column favinfo'>
                                <h2 className='favname'>{fav.name}</h2>
                                <span className='favprice'>
                                  $ {formatNumber(fav.price)}
                                </span>
                              </div>
                            </a>
                          </li>
                        ))
                      )}
                      {idListProducts.length >= 3 && (
                        <li>
                          <a href='/favoritos'>Ver todos tus favoritos</a>
                        </li>
                      )}
                    </>
                  ) : (
                    <span className='nofavs'>
                      Agregá a tus favoritos y seguilos desde aca
                    </span>
                  )}
                </ul>
              </div>
            </li>
          )}
          <li>
            <a className='nodecoration' href='/carrito'>
              <i className='fa fa-shopping-cart fa-lg'></i>{' '}
            </a>
          </li>
          {user && (
            <li>
              <div className='dropdown'>
                <a className='nodecoration' href='#notificaciones'>
                  <i className='fa fa-bell fa-lg'></i>
                  {localNotifications > 0 && (
                    <div className='notification-badge'>
                      {localNotifications.length < 10
                        ? localNotifications.length
                        : '+9'}
                    </div>
                  )}
                </a>
                <ul className='dropdown-content notifications'>
                  <li>
                    <h2 style={{ margin: '0' }}>Notificaciones</h2>
                  </li>
                  {loadingDeleteNotification ? (
                    <div className='absolute-loading'>
                      <LoadingCircle color='blue' padding={true} />
                    </div>
                  ) : errorDeletingNotification ? (
                    <MessageBox variant='danger'>
                      Ha ocurrido un error con las notificaciones
                    </MessageBox>
                  ) : localNotifications.length >= 1 ? (
                    localNotifications.map(
                      (noti, i) =>
                        i < 3 && (
                          <li
                            className='separator'
                            key={noti._id}
                            style={{ position: 'relative' }}
                          >
                            <div className='delbtn-div'>
                              <button
                                onClick={() => {
                                  dispatch(deleteNotificationUser(noti._id));
                                  setLocalNotifications(
                                    localNotifications.filter(
                                      (localNoti) => localNoti._id !== noti._id
                                    )
                                  );
                                }}
                              >
                                Eliminar
                              </button>
                            </div>
                            <a
                              className='row top nodecoration'
                              href={noti.linkTo}
                              onClick={() =>
                                dispatch(deleteNotificationUser(noti._id))
                              }
                            >
                              <h4>
                                {noti.text.split(':')[0]}
                                <br />
                                {noti.text.split(':')[1]}
                              </h4>
                            </a>
                            <p className='notification-date'>
                              <i className='fas fa-clock'></i>
                              {formatDate(currentTime) ===
                              removeMinutesFromDate(noti.createdAt)
                                ? justMinutesFromDate(noti.createdAt)
                                : removeMinutesFromDate(noti.createdAt)}
                            </p>
                          </li>
                        )
                    )
                  ) : (
                    <li>
                      <span className='nofavs'>No hay nada por aquí</span>
                    </li>
                  )}
                </ul>
              </div>
            </li>
          )}
        </ul>
      </div>
      <nav className='small-screen-nav-bar' id='small-screen-nav-bar'>
        <ul className='dropdown-content'>
          <li>
            {user ? (
              <a
                className='nodecoration'
                style={{ color: 'rgba(0, 0, 0, 0.8)', margin: '1rem 0rem' }}
                href='/mis-datos'
              >
                <i className='fa fa-user  fa-3x'></i>
                <span>{' Hola ' + user.name}</span>
              </a>
            ) : (
              <div className='small-navbar-notlogged-div'>
                <div className='row nowrap'>
                  <i className='fa fa-user  fa-3x'></i>
                  <div className='column margin-left'>
                    <span style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>
                      Bienvenido
                    </span>
                    <span>
                      Ingresa a tu cuenta para ver tus compras, favoritos, etc.
                    </span>
                  </div>
                </div>
                <div
                  className='row'
                  style={{ paddingTop: '1rem', width: '100%' }}
                >
                  <form action='/login' style={{ width: '49%' }}>
                    <button type='submit' className='primary block'>
                      Ingresá
                    </button>
                  </form>
                  <form action='/register' style={{ width: '49%' }}>
                    <button className='secondary block margin-left'>
                      Creá tu cuenta
                    </button>
                  </form>
                </div>
              </div>
            )}
          </li>
          <li className='separator'>
            <a id='inicio' className='nodecoration small-nav-bar' href='/'>
              <i className='fas fa-home fa-lg'></i>
              Inicio
            </a>
          </li>
          {user && (
            <li>
              <a
                id='notificaciones'
                className='nodecoration small-nav-bar relative'
                href='/notificaciones'
              >
                <i className='fas fa-bell fa-lg'></i>
                Notificaciones
              </a>
            </li>
          )}
          {user && (
            <li>
              <a
                id='compras'
                className='nodecoration small-nav-bar'
                href='/mis-compras'
              >
                <i className='fas fa-shopping-bag fa-lg'></i>
                Mis compras
              </a>
            </li>
          )}
          {user && (
            <li>
              <a
                id='ventas'
                className='nodecoration small-nav-bar'
                href='/mis-ventas'
              >
                <i className='fas fa-tags'></i>
                Mis ventas
              </a>
            </li>
          )}
          {user && (
            <li>
              <a
                id='preguntas'
                className='nodecoration small-nav-bar'
                href='/preguntas'
              >
                <i className='fas fa-question'></i>
                Preguntas
              </a>
            </li>
          )}
          {user && (
            <li>
              <a
                id='publicaciones'
                className='nodecoration small-nav-bar'
                href='/publicaciones'
              >
                <i className='fas fa-store'></i>
                Publicaciones
              </a>
            </li>
          )}
          {user && (
            <li>
              <a
                id='favoritos'
                className='nodecoration small-nav-bar'
                href='/favoritos'
              >
                <i className='fas fa-heart fa-lg'></i>
                Favoritos
              </a>
            </li>
          )}
          <li>
            <a
              id='historial'
              className='nodecoration small-nav-bar'
              href='/historial'
            >
              <i className='fas fa-clock fa-lg'></i>
              Historial
            </a>
          </li>
          <li>
            <a
              id='vender'
              className='nodecoration small-nav-bar'
              href='/vender'
            >
              <i className='fas fa-ticket-alt fa-lg'></i>
              Vender
            </a>
          </li>
          {user && (
            <li>
              <a
                id='vender'
                className='nodecoration small-nav-bar'
                href='/'
                onClick={() => {
                  localStorage.removeItem('userInfo');
                }}
              >
                <i className='fas fa-sign-out-alt'></i>
                Salir
              </a>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
