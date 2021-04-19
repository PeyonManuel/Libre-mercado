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
  dispatch({ type: 'USER_lOGIN_REQUEST' });
  try {
    const { data } = await Axios.post('/api/users/login', user);
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

export const addProducts = (productId) => async (dispatch, getState) => {
  const {
    userLogin: { user },
  } = getState();
  dispatch({ type: 'USER_ADD_PRODUCTS_REQUEST' });
  try {
    const { data } = await Axios.post(
      '/api/users/addProducts',
      {
        productId,
        user,
      },
      { headers: { Authorization: 'Bearer ' + user.token } }
    );
    dispatch({ type: 'USER_ADD_PRODUCTS_SUCCESS' });
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

export const updateAddresses = (address) => async (dispatch, getState) => {
  const {
    userLogin: { user },
  } = getState();
  dispatch({ type: 'USER_UPDATE_ADDRESSES_REQUEST' });
  try {
    const { data } = await Axios.post(
      '/api/users/updateAddresses',
      {
        address,
        user,
      },
      { headers: { Authorization: 'Bearer ' + user.token } }
    );
    dispatch({ type: 'USER_UPDATE_ADDRESSES_SUCCESS', payload: data });
    localStorage.setItem('userInfo', JSON.stringify(data));
    dispatch({ type: 'USER_LOGIN_SUCCESS', payload: data });
  } catch (error) {
    dispatch({
      type: 'USER_UPDATE_ADDRESSES_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteAddresses = (addressId) => async (dispatch, getState) => {
  const {
    userLogin: { user },
  } = getState();
  dispatch({ type: 'USER_DELETE_ADDRESSES_REQUEST' });
  try {
    const { data } = await Axios.post(
      '/api/users/deleteAddresses',
      {
        addressId,
        user,
      },
      { headers: { Authorization: 'Bearer ' + user.token } }
    );
    dispatch({ type: 'USER_DELETE_ADDRESSES_SUCCESS', payload: data });
    localStorage.setItem('userInfo', JSON.stringify(data));
    dispatch({ type: 'USER_LOGIN_SUCCESS', payload: data });
  } catch (error) {
    dispatch({
      type: 'USER_DELETE_ADDRESSES_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
