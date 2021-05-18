import { BrowserRouter, Switch, Route } from 'react-router-dom';
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
import HistoryScreen from './Screens/HistoryScreen';
import FavoritesScreen from './Screens/FavoritesScreen';
import PublishedScreen from './Screens/PublishedScreen';
import ModifyProductScreen from './Screens/ModifyProductScreen';
import UserQuestionsScreen from './Screens/UserQuestionsScreen';
import CheckoutRoute from './Components/Routes/CheckoutRoute';
import CheckoutScreen from './Screens/CheckoutScreen';
import CartScreen from './Screens/CartScreen';
import GlobalRoute from './Components/Routes/GlobalRoute';
import UserOrdersScreen from './Screens/UserOrdersScreen';
import SellerOrdersScreen from './Screens/SellerOrdersScreen';
import NotFoundScreen from './Screens/NotFoundScreen';
import UserDataScreen from './Screens/UserDataScreen';
import AuthenticationScreen from './Screens/AuthenticationScreen';
import ChangeUserInfoRoute from './Components/Routes/ChangeUserInfoRoute';
import ChangeUserScreen from './Screens/ChangeUserScreen';
import ChangeEmailScreen from './Screens/ChangeEmailScreen';
import NotificationScreen from './Screens/NotificationScreen';

const App = () => {
  useEffect(() => {
    const updateFontSize = () => {
      document.querySelector('html').style.fontSize =
        62.5 * window.devicePixelRatio + '%';
    };
    updateFontSize();
    window.addEventListener('resize', updateFontSize);
    return () => {
      window.removeEventListener('resize', updateFontSize);
    };
  }, []);
  if (window.location.pathname !== '/cambiar-contrasena')
    localStorage.removeItem('emailCodeValidated');
  return (
    <BrowserRouter key={window.location.pathname}>
      <div className='grid-container'>
        <GlobalRoute />
        <Switch>
          <Route path='/' exact component={Header}></Route>
          <Route path='/product/:id' component={Header}></Route>
          <Route path='/user/:id' component={Header}></Route>
          <Route path='/notificaciones' component={Header}></Route>
          <Route path='/productos' component={Header}></Route>
          <Route path='/historial' component={Header}></Route>
          <Route path='/favoritos' component={Header}></Route>
          <Route path='/publicaciones' component={Header}></Route>
          <Route path='/preguntas' component={Header}></Route>
          <Route path='/carrito' component={Header}></Route>
          <Route path='/mis-compras' component={Header}></Route>
          <Route path='/mis-ventas' component={Header}></Route>
          <Route path='/mis-datos' component={Header}></Route>
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
          <PrivateRoute
            path='/producto/modificar/:id'
            component={LessHeader}
          ></PrivateRoute>
          <Route path='*' component={EmptyHeader}></Route>
        </Switch>
        <main id='main'>
          <Switch>
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
            <PrivateRoute
              path='/historial'
              component={HistoryScreen}
            ></PrivateRoute>
            <PrivateRoute
              path='/favoritos'
              component={FavoritesScreen}
            ></PrivateRoute>
            <PrivateRoute
              path='/publicaciones'
              component={PublishedScreen}
            ></PrivateRoute>
            <PrivateRoute
              path='/producto/modificar/:id'
              component={ModifyProductScreen}
            ></PrivateRoute>
            <PrivateRoute
              path='/preguntas'
              component={UserQuestionsScreen}
            ></PrivateRoute>
            <CheckoutRoute
              path='/checkout'
              component={CheckoutScreen}
            ></CheckoutRoute>
            <PrivateRoute path='/carrito' component={CartScreen}></PrivateRoute>
            <PrivateRoute
              path='/mis-compras'
              component={UserOrdersScreen}
            ></PrivateRoute>
            <PrivateRoute
              path='/mis-ventas'
              component={SellerOrdersScreen}
            ></PrivateRoute>
            <PrivateRoute
              path='/mis-datos'
              exact
              component={UserDataScreen}
            ></PrivateRoute>
            <ChangeUserInfoRoute
              path='/mis-datos/cambiar-usuario'
              component={ChangeUserScreen}
            ></ChangeUserInfoRoute>
            <ChangeUserInfoRoute
              path='/mis-datos/cambiar-email'
              component={ChangeEmailScreen}
            ></ChangeUserInfoRoute>
            <PrivateRoute
              path='/authentication'
              component={AuthenticationScreen}
            ></PrivateRoute>
            <PrivateRoute
              path='/notificaciones'
              component={NotificationScreen}
            ></PrivateRoute>
            <Route path='*' component={NotFoundScreen}></Route>
          </Switch>
        </main>
        <Route path='*' exact component={SimpleFooter}></Route>
      </div>
    </BrowserRouter>
  );
};

export default App;
