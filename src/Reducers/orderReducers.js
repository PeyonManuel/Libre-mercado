export const newOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case 'CREATE_ORDER_REQUEST':
      return { loading: true };
    case 'CREATE_ORDER_SUCCESS':
      return { loading: false, success: true, orders: action.payload };
    case 'CREATE_ORDER_FAIL':
      return { loading: false, error: action.payload };
    case 'CREATE_ORDER_RESET':
      return {};
    default:
      return state;
  }
};

export const getUserOrdersReducer = (state = {}, action) => {
  switch (action.type) {
    case 'USER_ORDER_LIST_REQUEST':
      return { loading: true };
    case 'USER_ORDER_LIST_SUCCESS':
      return { loading: false, orders: action.payload };
    case 'USER_ORDER_LIST_FAIL':
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getUserSellsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'USER_SELLS_LIST_REQUEST':
      return { loading: true };
    case 'USER_SELLS_LIST_SUCCESS':
      return { loading: false, orders: action.payload };
    case 'USER_ORDER_LIST_FAIL':
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
