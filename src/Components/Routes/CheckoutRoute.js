import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const CheckoutRoute = ({ component: Component, ...rest }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { user } = userLogin;
  return (
    <Route
      {...rest}
      render={(props) => {
        const localCheckout = localStorage.getItem('localCheckout');
        return user && localCheckout ? (
          <Component {...props}></Component>
        ) : (
          <Redirect to='/' />
        );
      }}
    ></Route>
  );
};

export default CheckoutRoute;
