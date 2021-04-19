import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { useEffect } from 'react';
import SimpleFooter from './Components/Footers/SimpleFooter';
import Header from './Components/Headers/Header';
import EmptyHeader from './Components/Headers/EmptyHeader';
import LessHeader from './Components/Headers/LessHeader';
import PrivateRoute from './Components/PrivateRoute';
import NotLogedRoute from './Components/NotLogedRoute';
import EnterPassScreen from './Screens/EnterPassScreen';
import HomeScreen from './Screens/HomeScreen';
import LoginScreen from './Screens/LoginScreen';
import ProductScreen from './Screens/ProductScreen';
import RegisterScreen from './Screens/RegisterScreen';
import EmailValidationScreen from './Screens/EmailValidationScreen';
import NewProductScreen from './Screens/NewProductScreen';
import EnterPassRoute from './Components/EnterPassRoute';
import EmailValidationRoute from './Components/EmailValidationRoute';
import DraftsScreen from './Screens/DraftsScreen';
import PostScreen from './Screens/PostScreen';
import AddressScreen from './Screens/AddressScreen';

const App = () => {
  useEffect(() => {
    document.querySelector('html').style.fontSize =
      62.5 * window.devicePixelRatio + '%';
  }, []);
  return (
    <BrowserRouter key={window.location.pathname}>
      <div className='grid-container'>
        <Switch>
          <Route path='/' exact component={Header}></Route>
          <Route path='/product/:id' component={Header}></Route>
          <Route path='/user/:id' component={Header}></Route>
          <Route path='/notificaciones' component={Header}></Route>
          <PrivateRoute
            path='/vender'
            exact
            component={LessHeader}
          ></PrivateRoute>
          <PrivateRoute
            path='/vender/producto'
            component={LessHeader}
          ></PrivateRoute>
          <PrivateRoute path='/publicar' component={LessHeader}></PrivateRoute>
          <PrivateRoute
            path='/nueva-direccion'
            component={LessHeader}
          ></PrivateRoute>
          <Route path='*' component={EmptyHeader}></Route>
        </Switch>
        <main>
          <Route path='/' component={HomeScreen} exact></Route>
          <Route path='/product/:id' component={ProductScreen}></Route>
          <NotLogedRoute
            path='/register'
            component={RegisterScreen}
            exact
          ></NotLogedRoute>
          <EmailValidationRoute
            path='/email-validation'
            component={EmailValidationScreen}
            exact
          ></EmailValidationRoute>
          <NotLogedRoute
            path='/login'
            component={LoginScreen}
            exact
          ></NotLogedRoute>
          <EnterPassRoute
            path='/login/enterpass'
            component={EnterPassScreen}
          ></EnterPassRoute>
          <PrivateRoute
            path='/vender'
            exact
            component={DraftsScreen}
            redirectTo={'?loginType=vender'}
          ></PrivateRoute>
          <PrivateRoute
            path='/vender/producto'
            component={NewProductScreen}
            redirectTo={'?loginType=vender'}
          ></PrivateRoute>
          <PrivateRoute
            path='/publicar'
            component={PostScreen}
            redirectTo={'?loginType=vender'}
          ></PrivateRoute>
          <PrivateRoute
            path='/nueva-direccion'
            component={AddressScreen}
            redirectTo={'?loginType=vender'}
          ></PrivateRoute>
        </main>
        <Route path='*' exact component={SimpleFooter}></Route>
      </div>
    </BrowserRouter>
  );
};

export default App;
