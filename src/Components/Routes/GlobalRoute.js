import React from 'react';

const GlobalRoute = () => {
  const currentRoute = window.location.href.split('/')[3];
  if (
    !(
      currentRoute.includes('register') ||
      currentRoute.includes('email-validation')
    )
  ) {
    localStorage.removeItem('RegisterCacheValues');
  }
  if (currentRoute.includes('nueva-direccion')) {
    localStorage.removeItem('currentAddress');
  }
  if (
    !(
      currentRoute.includes('checkout') ||
      currentRoute.includes('nueva-direccion')
    )
  ) {
    localStorage.removeItem('__paypal_storage__');
    localStorage.removeItem('localCheckout');
  }
  return <></>;
};

export default GlobalRoute;
