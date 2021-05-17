import axios from 'axios';
import Axios from 'axios';
import { pushNotificationUser, userAddProduct } from './userActions';

export const listProducts = () => async (dispatch) => {
  dispatch({ type: 'PRODUCT_LIST_REQUEST' });
  try {
    const { data } = await Axios.get('/api/products');
    dispatch({ type: 'PRODUCT_LIST_SUCCESS', payload: data });
  } catch (error) {
    dispatch({
      type: 'PRODUCT_LIST_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const customListProducts = (filter) => async (dispatch) => {
  dispatch({ type: 'CUSTOM_PRODUCT_LIST_REQUEST' });
  try {
    const { data } = await Axios.get(
      '/api/products/customsearch?search=' +
        filter.search +
        '&category=' +
        filter.category +
        '&isStateNew=' +
        filter.isStateNew +
        '&noShipping=' +
        filter.noShipping +
        '&minimum=' +
        filter.minimum +
        '&maximum=' +
        filter.maximum
    );
    dispatch({ type: 'CUSTOM_PRODUCT_LIST_SUCCESS', payload: data });
  } catch (error) {
    dispatch({
      type: 'CUSTOM_PRODUCT_LIST_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listByIdsProducts = (idArray) => async (dispatch) => {
  dispatch({ type: 'PRODUCT_ID_LIST_REQUEST' });
  try {
    const { data } = await Axios.get('/api/products/idlist', {
      headers: { idArray },
    });
    dispatch({ type: 'PRODUCT_ID_LIST_SUCCESS', payload: data });
  } catch (error) {
    dispatch({
      type: 'PRODUCT_ID_LIST_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const detailsProduct = (productId) => async (dispatch) => {
  dispatch({ type: 'PRODUCT_DETAILS_REQUEST' });
  try {
    const { data } = await Axios.get('/api/products/' + productId);
    dispatch({ type: 'PRODUCT_DETAILS_SUCCESS', payload: data });
  } catch (error) {
    dispatch({
      type: 'PRODUCT_DETAILS_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createNewProduct = (product) => async (dispatch, getState) => {
  const {
    userLogin: { user },
  } = getState();
  dispatch({ type: 'NEW_PRODUCT_REQUEST' });
  try {
    const { data } = await axios.post(
      '/api/products/newProduct',
      { product, userId: user._id },
      { headers: { Authorization: 'Bearer ' + user.token } }
    );
    dispatch({ type: 'NEW_PRODUCT_SUCCESS', payload: data });
    dispatch(userAddProduct(data));
  } catch (error) {
    dispatch({
      type: 'NEW_PRODUCT_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteProduct = (productId) => async (dispatch, getState) => {
  const {
    userLogin: { user },
  } = getState();
  dispatch({ type: 'DELETE_PRODUCT_REQUEST' });
  try {
    const { data } = await axios.post(
      '/api/products/deleteProduct',
      { productId },
      { headers: { Authorization: 'Bearer ' + user.token } }
    );
    dispatch({ type: 'DELETE_PRODUCT_SUCCESS', payload: data });
  } catch (error) {
    dispatch({
      type: 'DELETE_PRODUCT_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateProduct = (product) => async (dispatch, getState) => {
  const {
    userLogin: { user },
  } = getState();
  dispatch({ type: 'UPDATE_PRODUCT_REQUEST' });
  try {
    const { data } = await axios.post(
      '/api/products/updateproduct',
      { product },
      { headers: { Authorization: 'Bearer ' + user.token } }
    );
    dispatch({ type: 'UPDATE_PRODUCT_SUCCESS', payload: data });
  } catch (error) {
    dispatch({
      type: 'UPDATE_PRODUCT_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addQuestionProduct = (product, question) => async (
  dispatch,
  getState
) => {
  const {
    userLogin: { user },
  } = getState();
  dispatch({ type: 'PRODUCT_ADD_QUESTION_REQUEST' });
  try {
    const { data } = await axios.post(
      '/api/products/addquestion',
      { productId: product._id, question },
      { headers: { Authorization: 'Bearer ' + user.token } }
    );
    dispatch({ type: 'PRODUCT_ADD_QUESTION_SUCCESS', payload: data });
    dispatch(
      pushNotificationUser(product.seller._id, {
        text: 'Te han hecho una pregunta en: ' + product.name,
        linkTo: '/product/' + product._id,
      })
    );
  } catch (error) {
    dispatch({
      type: 'PRODUCT_ADD_QUESTION_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const answerQuestionProduct = (product, question, editing) => async (
  dispatch,
  getState
) => {
  const {
    userLogin: { user },
  } = getState();
  dispatch({ type: 'PRODUCT_ANSWER_QUESTION_REQUEST' });
  try {
    const { data } = await axios.post(
      '/api/products/answerquestion',
      { productId: product._id, question },
      { headers: { Authorization: 'Bearer ' + user.token } }
    );
    dispatch({ type: 'PRODUCT_ANSWER_QUESTION_SUCCESS', payload: data });
    if (!editing) {
      dispatch(
        pushNotificationUser(question.whoAsked, {
          text: 'Te respondieron a tu pregunta en: ' + product.name,
          linkTo: '/product/' + product._id,
        })
      );
    }
  } catch (error) {
    dispatch({
      type: 'PRODUCT_ANSWER_QUESTION_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getUserQuestionProducts = () => async (dispatch, getState) => {
  const {
    userLogin: { user },
  } = getState();
  dispatch({ type: 'PRODUCT_USER_QUESTIONS_REQUEST' });
  try {
    const { data } = await Axios.get('/api/products/getuserquestionsproducts', {
      headers: { Authorization: 'Bearer ' + user.token },
    });
    dispatch({ type: 'PRODUCT_USER_QUESTIONS_SUCCESS', payload: data });
  } catch (error) {
    dispatch({
      type: 'PRODUCT_USER_QUESTIONS_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateProductsStock = (products) => async (dispatch) => {
  dispatch({ type: 'PRODUCT_UPDATE_STOCK_REQUEST' });
  try {
    const { data } = await Axios.post('/api/products/stockupdate', {
      code: process.env.REACT_APP_UPDATE_STOCK_CODE,
      products,
    });
    dispatch({ type: 'PRODUCT_UPDATE_STOCK_SUCCESS', payload: data });
  } catch (error) {
    dispatch({
      type: 'PRODUCT_UPDATE_STOCK_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getUserPublishedProducts = () => async (dispatch, getState) => {
  const {
    userLogin: { user },
  } = getState();
  dispatch({ type: 'USER_PUBLISHED_PRODUCTS_REQUEST' });
  try {
    const { data } = await Axios.get('/api/products/getuserpublishedproducts', {
      headers: { Authorization: 'Bearer ' + user.token },
    });
    dispatch({ type: 'USER_PUBLISHED_PRODUCTS_SUCCESS', payload: data });
  } catch (error) {
    dispatch({
      type: 'USER_PUBLISHED_PRODUCTS_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
