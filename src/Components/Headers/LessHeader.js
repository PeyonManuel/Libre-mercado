import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const LessHeader = (props) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { user } = userLogin;

  const [localNotifications, setLocalNotifications] = useState(
    user && user.userData && user.userData.notifications
      ? user.userData.notifications
      : []
  );

  useEffect(() => {
    if (user && user.userData && user.userData.notifications) {
      setLocalNotifications(user.userData.notifications);
    }
  }, [user]);

  useEffect(() => {
    document.querySelector('.grid-container').classList.add('less-header');
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
      case '/mis-compras':
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
  return (
    <header className='empty less row'>
      <div className='logo-container'>
        <a
          className='nodecoration'
          href='/'
          onClick={() => {
            localStorage.removeItem('userCheckNameInfo');
            localStorage.removeItem('hashCode');
          }}
        >
          <img
            className='logo big-logo'
            src='https://i.imgur.com/xDUqlt2.png'
            alt='Mercado libre logo'
          ></img>
          <img
            className='logo small-logo'
            src='https://global-selling.mercadolibre.com/brandprotection/enforcement/images?src=meli-logo.png'
            alt='Mercado libre logo'
            style={{ marginTop: '-0.5rem' }}
          ></img>
        </a>
      </div>
      <div
        className='burger less-header'
        onClick={() => {
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
      <div className='dropdown less-header'>
        <a className='nodecoration' href='#user'>
          <i className='fa fa-user  fa-lg'></i> {user.name}{' '}
          <i className='fa fa-caret-down'></i>
        </a>
        <ul className='dropdown-content less-header'>
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
      <nav
        className='small-screen-nav-bar less-header'
        id='small-screen-nav-bar'
      >
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
                <i className='fas fa-bell fa-lg relative'>
                  {' '}
                  {localNotifications.length > 0 && (
                    <div className='notification-badge'>
                      {localNotifications.length < 10
                        ? localNotifications.length
                        : '+9'}
                    </div>
                  )}
                </i>
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

export default LessHeader;
