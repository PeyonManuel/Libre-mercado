import Axios from 'axios';

export const newAddress = (address) => async (dispatch, getState) => {
  const {
    userLogin: { user },
  } = getState();
  dispatch({ type: 'NEW_ADDRESS_REQUEST' });
  try {
    const { data } = await Axios.post(
      '/api/addresses/newaddress',
      {
        address,
      },
      { headers: { Authorization: 'Bearer ' + user.token } }
    );
    dispatch({ type: 'NEW_ADDRESS_SUCCESS', payload: data });
  } catch (error) {
    dispatch({
      type: 'NEW_ADDRESS_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateAddress = (address) => async (dispatch, getState) => {
  const {
    userLogin: { user },
  } = getState();
  dispatch({ type: 'UPDATE_ADDRESS_REQUEST' });
  try {
    const { data } = await Axios.post(
      '/api/addresses/updateaddress',
      {
        address,
      },
      { headers: { Authorization: 'Bearer ' + user.token } }
    );
    dispatch({ type: 'UPDATE_ADDRESS_SUCCESS', payload: data });
  } catch (error) {
    dispatch({
      type: 'UPDATE_ADDRESS_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteAddress = (addressId) => async (dispatch, getState) => {
  const {
    userLogin: { user },
  } = getState();
  dispatch({ type: 'DELETE_ADDRESS_REQUEST' });
  try {
    const { data } = await Axios.post(
      '/api/addresses/deleteAddress',
      {
        addressId,
      },
      { headers: { Authorization: 'Bearer ' + user.token } }
    );
    dispatch({ type: 'DELETE_ADDRESS_SUCCESS', payload: data });
  } catch (error) {
    dispatch({
      type: 'DELETE_ADDRESS_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getUserAddresses = () => async (dispatch, getState) => {
  const {
    userLogin: { user },
  } = getState();
  dispatch({ type: 'USER_ADDRESSES_REQUEST' });
  try {
    const { data } = await Axios.get('/api/addresses/getuseraddresses', {
      headers: { Authorization: 'Bearer ' + user.token },
    });
    dispatch({ type: 'USER_ADDRESSES_SUCCESS', payload: data });
  } catch (error) {
    dispatch({
      type: 'USER_ADDRESSES_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
