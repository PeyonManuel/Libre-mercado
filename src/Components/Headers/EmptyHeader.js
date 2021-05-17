import React, { useEffect } from 'react';

const EmptyHeader = () => {
  useEffect(() => {
    document.querySelector('.grid-container').classList.add('less-header');
  }, []);
  return (
    <header className='empty'>
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
    </header>
  );
};

export default EmptyHeader;
