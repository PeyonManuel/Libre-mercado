import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import {
  deleteAddressReducer,
  getUserAddressesReducer,
  newAddressReducer,
  updateAddressReducer,
} from './Reducers/addressReducers';
import { categoryListReducer } from './Reducers/categoryReducers';
import {
  getUserOrdersReducer,
  getUserSellsReducer,
  newOrderReducer,
} from './Reducers/orderReducers';
import {
  productDetailsReducer,
  productListReducer,
  newProductReducer,
  deleteProductReducer,
  customProductListReducer,
  updateProductReducer,
  productAddQuestionReducer,
  productAnswerQuestionReducer,
  productGetUserQuestionReducer,
  productIdListReducer,
  productsUpdateStockReducer,
} from './Reducers/productReducers';
import {
  userCheckNameReducer,
  userDeleteProductDraftsReducer,
  userDetailsReducer,
  userLoginReducer,
  userRegisterReducer,
  userAddProductsReducer,
  userUpdateFavoritesReducer,
  userUpdateProductsDraftsReducer,
  userVerifyEmailExistsReducer,
  userDeleteProducsReducer,
  userUpdateReducer,
  userUpdateHistoryReducer,
  userGetHistoryDetailsReducer,
  userRemoveHistoryReducer,
  userGetPublishedProductsReducer,
  userPushNotificationReducer,
  userDeleteNotificationReducer,
  userUpdateCartReducer,
  usergetCartDetailsReducer,
  userCartRemoveMultipleReducer,
  userAuthenticateReducer,
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
  deleteProduct: deleteProductReducer,
  userDeleteProduct: userDeleteProducsReducer,
  userUpdate: userUpdateReducer,
  customProductList: customProductListReducer,
  historyUpdate: userUpdateHistoryReducer,
  userHistory: userGetHistoryDetailsReducer,
  removeHistory: userRemoveHistoryReducer,
  publishedProducts: userGetPublishedProductsReducer,
  productUpdate: updateProductReducer,
  productAddQuestion: productAddQuestionReducer,
  productAnswerQuestion: productAnswerQuestionReducer,
  productGetUserQuestions: productGetUserQuestionReducer,
  userPushNotification: userPushNotificationReducer,
  userDeleteNotification: userDeleteNotificationReducer,
  idListProduct: productIdListReducer,
  addressNew: newAddressReducer,
  addressUpdate: updateAddressReducer,
  addressDelete: deleteAddressReducer,
  userAddresses: getUserAddressesReducer,
  orderCreate: newOrderReducer,
  cartUpdate: userUpdateCartReducer,
  userCart: usergetCartDetailsReducer,
  cartRemoveMultiple: userCartRemoveMultipleReducer,
  userOrders: getUserOrdersReducer,
  productsUpdateStock: productsUpdateStockReducer,
  userSells: getUserSellsReducer,
  userAuthenticate: userAuthenticateReducer,
});

const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
