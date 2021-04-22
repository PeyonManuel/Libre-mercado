import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const NotLogedRoute = ({ component: Component, ...rest }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { user } = userLogin;
  return (
    <Route
      {...rest}
      render={(props) =>
        !user ? <Component {...props}></Component> : <Redirect to='/' />
      }
    ></Route>
  );
};

export default NotLogedRoute;
