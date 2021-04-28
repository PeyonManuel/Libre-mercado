import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const EmailValidationRoute = ({ component: Component, ...rest }) => {
  const userVerifyEmail = useSelector((state) => state.userVerifyEmail);
  const { checkedEmail } = userVerifyEmail;
  return (
    <Route
      {...rest}
      render={(props) => {
        const user = localStorage.getItem('RegisterCacheValues');
        const userCheckName = localStorage.getItem('userCheckNameInfo');
        const urlParams = new URLSearchParams(props.location.search);
        const authType = urlParams.get('authType');
        if (authType === 'register') {
          return user || userCheckName ? (
            <Component {...props}></Component>
          ) : (
            <Redirect to='/' />
          );
        }
        if (checkedEmail) {
          localStorage.setItem(
            'doesEmailExist',
            JSON.stringify({ exits: true, email: checkedEmail })
          );
          return user || userCheckName ? (
            <Component {...props}></Component>
          ) : (
            <Redirect to='/' />
          );
        } else if (!localStorage.getItem('doesEmailExist')) {
          return <Redirect to='/' />;
        }
      }}
    ></Route>
  );
};

export default EmailValidationRoute;
