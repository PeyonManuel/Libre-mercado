import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, redirectTo, ...rest }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { user } = userLogin;
  return (
    <Route
      {...rest}
      render={(props) =>
        user ? (
          <Component {...props}></Component>
        ) : (
          <Redirect to={'/login' + (redirectTo ? redirectTo : '')} />
        )
      }
    ></Route>
  );
};

export default PrivateRoute;
