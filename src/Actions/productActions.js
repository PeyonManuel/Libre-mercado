import axios from 'axios';
import Axios from 'axios';

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
      'api/products/newProduct',
      { product, userId: user._id },
      { headers: { Authorization: 'Bearer ' + user.token } }
    );
    dispatch({ type: 'NEW_PRODUCT_SUCCESS', payload: data });
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
      'api/products/deleteProduct',
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
