import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { categoryListReducer } from './Reducers/categoryReducers';
import {
  productDetailsReducer,
  productListReducer,
  newProductReducer,
} from './Reducers/productReducers';
import {
  userCheckNameReducer,
  userDeleteAddressesReducer,
  userDeleteProductDraftsReducer,
  userDetailsReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateAddressesReducer,
  userAddProductsReducer,
  userUpdateFavoritesReducer,
  userUpdateProductsDraftsReducer,
  userVerifyEmailExistsReducer,
} from './Reducers/userReducers';

const initialState = {
  userCheckName: {
    user: localStorage.getItem('userCheckNameInfo')
      ? JSON.parse(localStorage.getItem('userCheckNameInfo'))
      : null,
  },
  userLogin: {
    user: localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo'))
      : null,
  },
  userVerifyEmail: {
    checkedEmail: localStorage.getItem('verifyEmail')
      ? JSON.parse(localStorage.getItem('verifyEmail'))
      : null,
  },
};

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  newProduct: newProductReducer,
  userDetails: userDetailsReducer,
  userCheckName: userCheckNameReducer,
  userLogin: userLoginReducer,
  userUpdateFavs: userUpdateFavoritesReducer,
  userRegister: userRegisterReducer,
  userVerifyEmail: userVerifyEmailExistsReducer,
  categoryList: categoryListReducer,
  userUpdateProductDrafts: userUpdateProductsDraftsReducer,
  userDeleteProductDrafts: userDeleteProductDraftsReducer,
  userAddProducts: userAddProductsReducer,
  userUpdateAddresses: userUpdateAddressesReducer,
  userDeleteAddresses: userDeleteAddressesReducer,
});

const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
