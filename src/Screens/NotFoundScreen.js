import React from 'react';

const NotFoundScreen = () => {
  return (
    <div className='height-100 width-100 flex-center'>
      <div className='column flex-center'>
        <img src='https://svgshare.com/i/XCT.svg' alt='Error 404' />
        <h1 style={{ textAlign: 'center' }}>
          Parece que esta pagina no existe
        </h1>
        <a href='/'>Ir a la pagina principal</a>
      </div>
    </div>
  );
};

export default NotFoundScreen;
