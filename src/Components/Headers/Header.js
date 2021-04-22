import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserFavorites } from '../../Actions/userActions';
import { formatNumber } from '../../Utils/Utilities';

const Header = (props) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { user } = userLogin;
  const userUpdateFavs = useSelector((state) => state.userUpdateFavs);
  const { error } = userUpdateFavs;
  const dispatch = useDispatch();
  const [localFavorites, setLocalFavorites] = useState(
    user && user.userData && user.userData.favorites
      ? user.userData.favorites
      : []
  );
  const [screenWidth, setScreenWidth] = useState(window.outerWidth);
  useEffect(() => {
    var onresize = function (e) {
      setScreenWidth(e.target.outerWidth);
    };
    window.addEventListener('resize', onresize);
  }, []);
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
      case '/compras':
        document.querySelector('#compras') &&
          document.querySelector('#compras').classList.add('current');
        break;
      case '/favoritos':
        document.querySelector('#favoritos') &&
          document.querySelector('#favoritos').classList.add('current');
        break;
      case '/ofertas':
        document.querySelector('#ofertas') &&
          document.querySelector('#ofertas').classList.add('current');
        break;
      case '/historial':
        document.querySelector('#historial') &&
          document.querySelector('#historial').classList.add('current');
        break;
      case '/vender':
        document.querySelector('#vender') &&
          document.querySelector('#vender').classList.add('current');
        break;
      case '/categorias':
        document.querySelector('#categorias') &&
          document.querySelector('#categorias').classList.add('current');
        break;
      case '/supermercado':
        document.querySelector('#supermercado') &&
          document.querySelector('#supermercado').classList.add('current');
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
      (user && user.userData && user.userData.favorites) ||
      (user && user.userData && user.userData.favorites && error)
    ) {
      setLocalFavorites(user.userData.favorites);
    }
  }, [user, error]);
  return (
    <header className='row'>
      <div
        style={{
          width: '120rem',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <div className='halfs'>
          <div className='row half left'>
            <div>
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
                placeholder='Buscar productos, marcas y mas...'
              ></input>
              <i className='fa fa-search'></i>
            </div>

            {screenWidth < 1024 && (
              <div className='row cart'>
                <div
                  className='burger'
                  onClick={(e) => {
                    document
                      .querySelector('.burger')
                      .classList.toggle('toggle');
                    document
                      .getElementById('small-screen-nav-bar')
                      .classList.toggle('active');
                  }}
                >
                  <div className='line1'></div>
                  <div className='line2'></div>
                  <div className='line3'></div>
                </div>
                <i className='fa fa-shopping-cart fa-lg'></i>
              </div>
            )}
          </div>
          {screenWidth > 1024 && (
            <div
              className='row first-half half left'
              style={{ paddingTop: '1.5rem' }}
            >
              <div style={{ width: '14rem' }}></div>
              <ul className='row market-options top'>
                <li>
                  <a className='nodecoration' href='#categorias'>
                    Categorias <i className='fa fa-caret-down'></i>
                  </a>
                </li>
                <li>
                  <a className='nodecoration' href='/ofertas'>
                    Ofertas
                  </a>
                </li>
                <li>
                  <a className='nodecoration' href='/historial'>
                    Historial
                  </a>
                </li>
                <li>
                  <a className='nodecoration' href='/supermercado'>
                    Supermercado
                  </a>
                </li>
                <li className='tiendas-oficiales'>
                  <a className='nodecoration' href='/tiendasoficiales'>
                    Tiendas oficiales
                  </a>
                </li>
                <li>
                  <a className='nodecoration' href='/vender'>
                    Vender
                  </a>
                </li>
                <li>
                  <a className='nodecoration' href='/ayuda'>
                    Ayuda
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
        {screenWidth > 1024 && (
          <ul className='row user-options half'>
            <li>
              {user ? (
                <div className='dropdown'>
                  <a className='nodecoration' href='#user'>
                    <i className='fa fa-user  fa-lg'></i> {user.name}{' '}
                    <i className='fa fa-caret-down'></i>
                  </a>
                  <ul className='dropdown-content'>
                    <li>
                      <a className='nodecoration' href={'/user/' + user._id}>
                        <i className='fa fa-user  fa-3x'></i>
                        <span>{' Hola ' + user.name}</span>
                      </a>
                    </li>
                    <li className='separator'>
                      <a className='nodecoration ' href='#compras'>
                        Compras
                      </a>
                    </li>
                    <li>
                      <a className='nodecoration' href='#Preguntas'>
                        Preguntas
                      </a>
                    </li>
                    <li className='separator'>
                      <a className='nodecoration' href='#Publicaciones'>
                        Publicaciones
                      </a>
                    </li>
                    <li>
                      <a className='nodecoration' href='#Ventas'>
                        Ventas
                      </a>
                    </li>
                    <li>
                      <a className='nodecoration separator' href='#Misdatos'>
                        Mis datos
                      </a>
                    </li>
                    <li className='separator'>
                      <a
                        className='nodecoration'
                        href='#salir'
                        onClick={() => {
                          dispatch({ type: 'USER_LOGIN_RESET' });
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
              <a className='nodecoration' href='/compras'>
                Mis compras{' '}
              </a>
            </li>
            {user && (
              <li>
                <div className='dropdown'>
                  <a className='nodecoration' href='#favorites'>
                    {'Favoritos '}
                    <i className='fa fa-caret-down'></i>
                  </a>
                  <ul className='dropdown-content favorites'>
                    <li>
                      <h2 style={{ margin: '0' }}>Favoritos</h2>
                    </li>
                    {localFavorites.length >= 1 ? (
                      localFavorites.map((fav, i) => {
                        return (
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
                                  setLocalFavorites(
                                    localFavorites.filter(
                                      (localFav) => localFav._id !== fav._id
                                    )
                                  );
                                }}
                              >
                                Eliminar
                              </button>
                            </div>
                            <div
                              className='row buybtns-div'
                              style={{ columnGap: '1rem' }}
                            >
                              <a href={'/product/' + fav._id + '/buy'}>
                                Comprar
                              </a>
                              <a href={'/product/' + fav._id + '/buy'}>
                                Agregar al carrito
                              </a>
                            </div>
                            <a
                              className='row top nodecoration'
                              href={'/product/' + fav._id}
                            >
                              <img
                                className='favimg'
                                src={fav.images[0]}
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
                        );
                      })
                    ) : (
                      <li>
                        <span className='nofavs'>
                          Agregá a tus favoritos y seguilos desde aca
                        </span>
                      </li>
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
                    <i className='fa fa-bell fa-lg'></i>{' '}
                  </a>
                  <ul className='dropdown-content notifications'>
                    <li>
                      <h2 style={{ margin: '0' }}>Notificaciones</h2>
                    </li>

                    <li>
                      <span className='nofavs'>
                        Por ahora, no hay nada aquí
                      </span>
                    </li>
                  </ul>
                </div>
              </li>
            )}
          </ul>
        )}
      </div>
      <nav className='small-screen-nav-bar' id='small-screen-nav-bar'>
        <ul className='dropdown-content'>
          <li>
            {user ? (
              <a
                className='nodecoration'
                style={{ color: 'rgba(0, 0, 0, 0.8)', margin: '1rem 0rem' }}
                href={'/user/' + user._id}
              >
                <i className='fa fa-user  fa-3x'></i>
                <span>{' Hola ' + user.name}</span>
              </a>
            ) : (
              <div className='small-navbar-notlogged-div'>
                <i className='fa fa-user  fa-3x'></i>
                <div className='column'>
                  <span style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>
                    Bienvenido
                  </span>
                  <span>
                    Ingresa a tu cuenta para ver tus compras, favoritos, etc.
                  </span>
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
                      <button className='secondary block'>
                        Creá tu cuenta
                      </button>
                    </form>
                  </div>
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
                className='nodecoration small-nav-bar'
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
                href='/compras'
              >
                <i className='fas fa-shopping-bag fa-lg'></i>
                Mis compras
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
              id='ofertas'
              className='nodecoration small-nav-bar'
              href='/ofertas'
            >
              <i className='fas fa-percentage fa-lg'></i>
              Ofertas
            </a>
          </li>
          {user && (
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
          )}
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
          <li className='separator'>
            <a
              id='categorias'
              className='nodecoration small-nav-bar'
              href='/categorias'
            >
              <i className='fas fa-list-ul fa-lg'></i>
              Categorias
            </a>
          </li>
          <li className='separator'>
            <a id='ayuda' className='nodecoration small-nav-bar' href='/ayuda'>
              <i className='fas fa-question-circle fa-lg'></i>
              Ayuda
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
