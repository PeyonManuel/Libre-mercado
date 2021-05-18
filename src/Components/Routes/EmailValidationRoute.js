import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const EmailValidationRoute = ({ component: Component, ...rest }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { user: loggedUser } = userLogin;
  return (
    <Route
      {...rest}
      render={(props) => {
        const checkedEmail = localStorage.getItem('verifyEmail');
        const user = localStorage.getItem('RegisterCacheValues');
        const userCheckName = localStorage.getItem('userCheckNameInfo');
        const urlParams = new URLSearchParams(props.location.search);
        const authType = urlParams.get('authType');
        if (authType === 'register') {
          return user || userCheckName || loggedUser ? (
            <Component {...props}></Component>
          ) : (
            <Redirect to='/' />
          );
        }
        if (checkedEmail) {
          return user || userCheckName ? (
            <Component {...props}></Component>
          ) : (
            <Redirect to='/' />
          );
        } else {
          return <Redirect to='/' />;
        }
      }}
    ></Route>
  );
};

export default EmailValidationRoute;
