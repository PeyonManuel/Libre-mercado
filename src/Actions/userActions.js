import Axios from 'axios';

export const detailsUser = (userId) => async (dispatch) => {
  dispatch({ type: 'USER_DETAILS_REQUEST' });
  try {
    const { data } = await Axios.get('/api/users/' + userId);
    dispatch({ type: 'USER_DETAILS_SUCCESS', payload: data });
  } catch (error) {
    dispatch({
      type: 'USER_DETAILS_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const checkUserName = (loginInfo) => async (dispatch) => {
  dispatch({ type: 'USER_CHECKNAME_REQUEST' });
  try {
    const { data } = await Axios.post('/api/users/checkname', { loginInfo });
    dispatch({ type: 'USER_CHECKNAME_SUCCESS', payload: data });
    localStorage.setItem('userCheckNameInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: 'USER_CHECKNAME_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const loginUser = (user) => async (dispatch) => {
  dispatch({ type: 'USER_LOGIN_REQUEST' });
  try {
    const { data } = await Axios.post('/api/users/login', user);
    console.log(data);
    localStorage.setItem('userInfo', JSON.stringify(data));
    dispatch({ type: 'USER_LOGIN_SUCCESS', payload: data });
  } catch (error) {
    dispatch({
      type: 'USER_LOGIN_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const authenticateUser = (user) => async (dispatch) => {
  dispatch({ type: 'USER_AUTHENTICATE_REQUEST' });
  try {
    const { data } = await Axios.post('/api/users/authenticate', user);
    dispatch({ type: 'USER_AUTHENTICATE_SUCCESS', payload: data });
  } catch (error) {
    dispatch({
      type: 'USER_AUTHENTICATE_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const loginUserWithCode = (userId, code) => async (dispatch) => {
  dispatch({ type: 'USER_LOGIN_REQUEST' });
  try {
    const { data } = await Axios.post('/api/users/loginwithcode', {
      userId,
      code,
    });
    localStorage.setItem('userInfo', JSON.stringify(data));
    dispatch({ type: 'USER_LOGIN_SUCCESS', payload: data });
  } catch (error) {
    dispatch({
      type: 'USER_LOGIN_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateUserFavorites = (updateFav) => async (
  dispatch,
  getState
) => {
  const {
    userLogin: { user },
  } = getState();
  dispatch({ type: 'UPDATE_USER_FAVORITES_REQUEST' });
  try {
    const { data } = await Axios.post(
      '/api/users/updatefavs',
      { user, updateFav },
      { headers: { Authorization: 'Bearer ' + user.token } }
    );
    dispatch({ type: 'UPDATE_USER_FAVORITES_SUCCESS', payload: data });
    localStorage.setItem('userInfo', JSON.stringify(data));
    dispatch({ type: 'USER_LOGIN_SUCCESS', payload: data });
  } catch (error) {
    dispatch({
      type: 'UPDATE_USER_FAVORITES_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const userVerifyEmailExists = (email) => async (dispatch) => {
  dispatch({ type: 'USER_VERIFYEMAILEXISTS_REQUEST' });
  try {
    const { data } = await Axios.post('/api/users/verifyemailexists', {
      email,
    });
    dispatch({ type: 'USER_VERIFYEMAILEXISTS_SUCCESS', payload: data });
    localStorage.setItem('verifyEmail', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: 'USER_VERIFYEMAILEXISTS_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const registerUser = (newUser) => async (dispatch) => {
  dispatch({ type: 'USER_REGISTER_REQUEST' });
  try {
    const { data } = await Axios.post('/api/users/register', newUser);
    dispatch({ type: 'USER_REGISTER_SUCCESS', payload: data });
    localStorage.setItem('userInfo', JSON.stringify(data));
    dispatch({ type: 'USER_LOGIN_SUCCESS', payload: data });
  } catch (error) {
    dispatch({
      type: 'USER_REGISTER_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateProductDrafts = (draft) => async (dispatch, getState) => {
  const {
    userLogin: { user },
  } = getState();
  dispatch({ type: 'USER_UPDATE_PRODUCT_DRAFTS_REQUEST' });
  try {
    const { data } = await Axios.post(
      '/api/users/updateProductDrafts',
      {
        draft,
        user,
      },
      { headers: { Authorization: 'Bearer ' + user.token } }
    );
    dispatch({ type: 'USER_UPDATE_PRODUCT_DRAFTS_SUCCESS', payload: data });
    localStorage.setItem('userInfo', JSON.stringify(data));
    dispatch({ type: 'USER_LOGIN_SUCCESS', payload: data });
  } catch (error) {
    dispatch({
      type: 'USER_UPDATE_PRODUCT_DRAFTS_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteProductDrafts = (draftId) => async (dispatch, getState) => {
  const {
    userLogin: { user },
  } = getState();
  dispatch({ type: 'USER_DELETE_PRODUCT_DRAFTS_REQUEST' });
  try {
    const { data } = await Axios.post(
      '/api/users/deleteProductDrafts',
      {
        draftId,
        user,
      },
      { headers: { Authorization: 'Bearer ' + user.token } }
    );
    dispatch({ type: 'USER_DELETE_PRODUCT_DRAFTS_SUCCESS', payload: data });
    localStorage.setItem('userInfo', JSON.stringify(data));
    dispatch({ type: 'USER_LOGIN_SUCCESS', payload: data });
  } catch (error) {
    dispatch({
      type: 'USER_DELETE_PRODUCT_DRAFTS_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const userAddProduct = (product) => async (dispatch, getState) => {
  const {
    userLogin: { user },
  } = getState();
  dispatch({ type: 'USER_ADD_PRODUCTS_REQUEST' });
  try {
    const { data } = await Axios.post(
      '/api/users/addProducts',
      {
        product,
        user,
      },
      { headers: { Authorization: 'Bearer ' + user.token } }
    );
    dispatch({ type: 'USER_ADD_PRODUCTS_SUCCESS', payload: data });
  } catch (error) {
    dispatch({
      type: 'USER_ADD_PRODUCTS_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const userDeleteProduct = (productId) => async (dispatch, getState) => {
  const {
    userLogin: { user },
  } = getState();
  dispatch({ type: 'USER_DELETE_PRODUCTS_REQUEST' });
  try {
    const { data } = await Axios.post(
      '/api/users/delete  Products',
      {
        productId,
        user,
      },
      { headers: { Authorization: 'Bearer ' + user.token } }
    );
    dispatch({ type: 'USER_DELETE_PRODUCTS_SUCCESS', payload: data });
  } catch (error) {
    dispatch({
      type: 'USER_DELETE_PRODUCTS_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateUser = (userToUpdate, updatePassword) => async (
  dispatch,
  getState
) => {
  const {
    userLogin: { user },
  } = getState();
  dispatch({ type: 'USER_UPDATE_REQUEST' });
  try {
    const { data } = await Axios.post(
      '/api/users/updateuser',
      {
        user: { _id: user._id, ...userToUpdate },
        updatePassword,
      },
      { headers: { Authorization: 'Bearer ' + user.token } }
    );
    dispatch({ type: 'USER_UPDATE_SUCCESS', payload: data });
    localStorage.setItem('userInfo', JSON.stringify(data));
    dispatch({ type: 'USER_LOGIN_SUCCESS', payload: data });
  } catch (error) {
    dispatch({
      type: 'USER_UPDATE_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateHistory = (productId, typeOfUpdate) => async (
  dispatch,
  getState
) => {
  const {
    userLogin: { user },
  } = getState();
  dispatch({ type: 'USER_HISTORY_UPDATE_REQUEST' });
  try {
    const { data } = await Axios.post(
      '/api/users/updatehistory',
      {
        productId,
        typeOfUpdate,
      },
      { headers: { Authorization: 'Bearer ' + user.token } }
    );
    dispatch({ type: 'USER_HISTORY_UPDATE_SUCCESS', payload: data });
    localStorage.setItem('userInfo', JSON.stringify(data));
    dispatch({ type: 'USER_LOGIN_SUCCESS', payload: data });
  } catch (error) {
    dispatch({
      type: 'USER_HISTORY_UPDATE_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const historyRemove = () => async (dispatch, getState) => {
  const {
    userLogin: { user },
  } = getState();
  dispatch({ type: 'USER_HISTORY_REMOVE_REQUEST' });
  try {
    const { data } = await Axios.post('/api/users/removehistory', user, {
      headers: { Authorization: 'Bearer ' + user.token },
    });
    dispatch({ type: 'USER_HISTORY_REMOVE_SUCCESS', payload: data });
    dispatch({ type: 'USER_HISTORY_SUCCESS', payload: data });
  } catch (error) {
    dispatch({
      type: 'USER_HISTORY_REMOVE_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getHistoryDetails = () => async (dispatch, getState) => {
  const {
    userLogin: { user },
  } = getState();
  dispatch({ type: 'USER_HISTORY_REQUEST' });
  try {
    const { data } = await Axios.get('/api/users/gethistorydetails', {
      headers: { Authorization: 'Bearer ' + user.token },
    });
    dispatch({ type: 'USER_HISTORY_SUCCESS', payload: data });
  } catch (error) {
    dispatch({
      type: 'USER_HISTORY_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const pushNotificationUser = (userId, notification) => async (
  dispatch
) => {
  dispatch({ type: 'USER_PUSH_NOTIFICATION_REQUEST' });
  try {
    const { data } = await Axios.post('/api/users/pushnotification', {
      userId,
      notification,
      code: process.env.REACT_APP_NOTIFICATION_CODE,
    });
    dispatch({ type: 'USER_PUSH_NOTIFICATION_SUCCESS', payload: data });
  } catch (error) {
    dispatch({
      type: 'USER_PUSH_NOTIFICATION_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteNotificationUser = (notificationId) => async (
  dispatch,
  getState
) => {
  const {
    userLogin: { user },
  } = getState();
  dispatch({ type: 'USER_DELETE_NOTIFICATION_REQUEST' });
  try {
    const { data } = await Axios.post(
      '/api/users/deletenotification',
      {
        notificationId,
      },
      {
        headers: { Authorization: 'Bearer ' + user.token },
      }
    );
    dispatch({ type: 'USER_DELETE_NOTIFICATION_SUCCESS', payload: data });
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: 'USER_DELETE_NOTIFICATION_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateCart = (item, typeOfUpdate) => async (
  dispatch,
  getState
) => {
  const {
    userLogin: { user },
  } = getState();
  dispatch({ type: 'USER_CART_UPDATE_REQUEST' });
  try {
    const { data } = await Axios.post(
      '/api/users/updatecart',
      {
        item,
        typeOfUpdate,
      },
      { headers: { Authorization: 'Bearer ' + user.token } }
    );
    dispatch({ type: 'USER_CART_UPDATE_SUCCESS', payload: data });
  } catch (error) {
    dispatch({
      type: 'USER_CART_UPDATE_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getCartDetails = () => async (dispatch, getState) => {
  const {
    userLogin: { user },
  } = getState();
  dispatch({ type: 'USER_CART_REQUEST' });
  try {
    const { data } = await Axios.get('/api/users/getcartdetails', {
      headers: { Authorization: 'Bearer ' + user.token },
    });
    dispatch({ type: 'USER_CART_SUCCESS', payload: data });
  } catch (error) {
    dispatch({
      type: 'USER_CART_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const cartRemoveMultiple = (productsIds) => async (
  dispatch,
  getState
) => {
  const {
    userLogin: { user },
  } = getState();
  dispatch({ type: 'USER_CART_REMOVE_MULTIPLE_REQUEST' });
  try {
    const { data } = await Axios.post(
      '/api/users/cartremovemultiple',
      { productsIds },
      {
        headers: { Authorization: 'Bearer ' + user.token },
      }
    );
    dispatch({ type: 'USER_CART_REMOVE_MULTIPLE_SUCCESS', payload: data });
  } catch (error) {
    dispatch({
      type: 'USER_CART_REMOVE_MULTIPLE_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
