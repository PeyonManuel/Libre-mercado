import Axios from 'axios';

export const listCategories = () => async (dispatch) => {
  dispatch({ type: 'CATEGORY_LIST_REQUEST' });
  try {
    const { data } = await Axios.get('/api/categories');
    dispatch({ type: 'CATEGORY_LIST_SUCCESS', payload: data });
  } catch (error) {
    dispatch({
      type: 'CATEGORY_LIST_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
