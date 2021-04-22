import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const ChangePasswordRoute = ({ component: Component, ...rest }) => {
  const userCheckName = useSelector((state) => state.userCheckName);
  const { user } = userCheckName;
  return (
    <Route
      {...rest}
      render={(props) => {
        const emailCodeValidated = localStorage.getItem('emailCodeValidated');
        return user && emailCodeValidated ? (
          <Component {...props}></Component>
        ) : (
          <Redirect to='/' />
        );
      }}
    ></Route>
  );
};

export default ChangePasswordRoute;
