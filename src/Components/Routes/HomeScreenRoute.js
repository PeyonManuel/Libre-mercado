import React from 'react';
import { Route } from 'react-router-dom';

const HomeScreenRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return <Component {...props}></Component>;
      }}
    ></Route>
  );
};

export default HomeScreenRoute;
