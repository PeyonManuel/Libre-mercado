import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const LessHeader = (props) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { user } = userLogin;
  const dispatch = useDispatch();

  const burgerRef = useRef(null);
  useEffect(() => {
    if (burgerRef.current !== null) {
      burgerRef.current.addEventListener('click', () => {
        burgerRef.current.classList.toggle('toggle');
        document
          .getElementById('small-screen-nav-bar')
          .classList.toggle('active');
      });
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
    }
  }, [burgerRef, props]);
  return (
    <header className='empty less row'>
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
      <div className='burger less-header' ref={burgerRef}>
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
                    <button className='primary' style={{ width: '49%' }}>
                      Ingresá
                    </button>
                    <button className='secondary' style={{ width: '49%' }}>
                      Creá tu cuenta
                    </button>
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

export default LessHeader;
