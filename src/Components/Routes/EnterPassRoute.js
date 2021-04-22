import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const EnterPassRoute = ({ component: Component, ...rest }) => {
  const userCheckName = useSelector((state) => state.userCheckName);
  const { user } = userCheckName;
  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Component {...props}></Component> : <Redirect to='/login' />
      }
    ></Route>
  );
};

export default EnterPassRoute;
