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
        var emailVerified = true;
        if (checkedEmail) {
          localStorage.setItem(
            'verifiedEmail',
            JSON.stringify({ exits: true, email: checkedEmail })
          );
          emailVerified = true;
        } else if (!localStorage.getItem('verifiedEmail')) {
          emailVerified = false;
        }
        return (user || userCheckName) && emailVerified ? (
          <Component {...props}></Component>
        ) : (
          <Redirect to='/' />
        );
      }}
    ></Route>
  );
};

export default EmailValidationRoute;
