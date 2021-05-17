import Axios from 'axios';

export const newOrders = (orders) => async (dispatch, getState) => {
  const {
    userLogin: { user },
  } = getState();
  dispatch({ type: 'CREATE_ORDER_REQUEST' });
  try {
    const { data } = await Axios.post(
      '/api/orders/neworders',
      { orders },
      { headers: { Authorization: 'Bearer ' + user.token } }
    );
    dispatch({ type: 'CREATE_ORDER_SUCCESS', payload: data });
  } catch (error) {
    dispatch({
      type: 'CREATE_ORDER_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getUserOrders = () => async (dispatch, getState) => {
  const {
    userLogin: { user },
  } = getState();
  dispatch({ type: 'USER_ORDER_LIST_REQUEST' });
  try {
    const { data } = await Axios.get('/api/orders/getuserorders', {
      headers: { Authorization: 'Bearer ' + user.token },
    });
    dispatch({ type: 'USER_ORDER_LIST_SUCCESS', payload: data });
  } catch (error) {
    dispatch({
      type: 'USER_ORDER_LIST_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getUserSells = () => async (dispatch, getState) => {
  const {
    userLogin: { user },
  } = getState();
  dispatch({ type: 'USER_SELLS_LIST_REQUEST' });
  try {
    const { data } = await Axios.get('/api/orders/getusersells', {
      headers: { Authorization: 'Bearer ' + user.token },
    });
    dispatch({ type: 'USER_SELLS_LIST_SUCCESS', payload: data });
  } catch (error) {
    dispatch({
      type: 'USER_ORDER_SELLS_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
