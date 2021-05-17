import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { verifyAuthenticationToken } from '../../Utils/Utilities';

const ChangeUserInfoRoute = ({ component: Component, ...rest }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { user } = userLogin;

  return (
    <Route
      {...rest}
      render={(props) => {
        const authenticateToken = localStorage.getItem('authenticateToken')
          ? JSON.parse(localStorage.getItem('authenticateToken'))
          : null;
        return user && verifyAuthenticationToken(authenticateToken.token) ? (
          <Component {...props}></Component>
        ) : (
          <Redirect to='/mis-datos' />
        );
      }}
    ></Route>
  );
};

export default ChangeUserInfoRoute;
