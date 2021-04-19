import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const EmailValidationRoute = ({ component: Component, ...rest }) => {
  const user = localStorage.getItem('RegisterCacheValues');

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Component {...props}></Component> : <Redirect to='/' />
      }
    ></Route>
  );
};

export default EmailValidationRoute;
