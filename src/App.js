import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { useEffect } from 'react';
import SimpleFooter from './Components/Footers/SimpleFooter';
import Header from './Components/Headers/Header';
import EmptyHeader from './Components/Headers/EmptyHeader';
import LessHeader from './Components/Headers/LessHeader';
import PrivateRoute from './Components/Routes/PrivateRoute';
import NotLogedRoute from './Components/Routes/NotLogedRoute';
import ChangePasswordRoute from './Components/Routes/ChangePasswordRoute';
import EnterPassScreen from './Screens/EnterPassScreen';
import HomeScreen from './Screens/HomeScreen';
import LoginScreen from './Screens/LoginScreen';
import ProductScreen from './Screens/ProductScreen';
import RegisterScreen from './Screens/RegisterScreen';
import EmailValidationScreen from './Screens/EmailValidationScreen';
import NewProductScreen from './Screens/NewProductScreen';
import EnterPassRoute from './Components/Routes/EnterPassRoute';
import EmailValidationRoute from './Components/Routes/EmailValidationRoute';
import HomeScreenRoute from './Components/Routes/HomeScreenRoute';
import DraftsScreen from './Screens/DraftsScreen';
import PostScreen from './Screens/PostScreen';
import AddressScreen from './Screens/AddressScreen';
import ChangePasswordScreen from './Screens/ChangePasswordScreen';
import SearchScreen from './Screens/SearchScreen';
import ProductPublishedScreen from './Screens/ProductPublishedScreen';

const App = () => {
  useEffect(() => {
    document.querySelector('html').style.fontSize =
      62.5 * window.devicePixelRatio + '%';
  }, []);
  if (window.location.pathname !== '/cambiar-contrasena')
    localStorage.removeItem('emailCodeValidated');
  return (
    <BrowserRouter key={window.location.pathname}>
      <div className='grid-container'>
        <Switch>
          <Route path='/' exact component={Header}></Route>
          <Route path='/product/:id' component={Header}></Route>
          <Route path='/user/:id' component={Header}></Route>
          <Route path='/notificaciones' component={Header}></Route>
          <Route path='/productos' component={Header}></Route>
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
          <PrivateRoute
            path='/producto-publicado/:id'
            component={LessHeader}
          ></PrivateRoute>
          <Route path='*' component={EmptyHeader}></Route>
        </Switch>
        <main id='main'>
          <HomeScreenRoute
            path='/'
            component={HomeScreen}
            exact
          ></HomeScreenRoute>
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
            redirectTo={'?loginType=new-address'}
            exact
          ></PrivateRoute>
          <ChangePasswordRoute
            path='/cambiar-contrasena'
            component={ChangePasswordScreen}
            exact
          ></ChangePasswordRoute>
          <Route path='/productos' component={SearchScreen}></Route>
          <PrivateRoute
            path='/producto-publicado/:id'
            component={ProductPublishedScreen}
          ></PrivateRoute>
        </main>
        <Route path='*' exact component={SimpleFooter}></Route>
      </div>
    </BrowserRouter>
  );
};

export default App;
