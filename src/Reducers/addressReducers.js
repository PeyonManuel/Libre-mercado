export const newAddressReducer = (state = {}, action) => {
  switch (action.type) {
    case 'NEW_ADDRESS_REQUEST':
      return { loading: true };
    case 'NEW_ADDRESS_SUCCESS':
      return { loading: false, address: action.payload };
    case 'NEW_ADDRESS_FAIL':
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const updateAddressReducer = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_ADDRESS_REQUEST':
      return { loading: true };
    case 'UPDATE_ADDRESS_SUCCESS':
      return { loading: false, address: action.payload };
    case 'UPDATE_ADDRESS_FAIL':
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const deleteAddressReducer = (state = {}, action) => {
  switch (action.type) {
    case 'DELETE_ADDRESS_REQUEST':
      return { loading: true };
    case 'DELETE_ADDRESS_SUCCESS':
      return { loading: false, deleted: true };
    case 'DELETE_ADDRESS_FAIL':
      return { loading: false, error: action.payload };
    case 'DELETE_ADDRESS_RESET':
      return {};
    default:
      return state;
  }
};

export const getUserAddressesReducer = (state = {}, action) => {
  switch (action.type) {
    case 'USER_ADDRESSES_REQUEST':
      return { loading: true };
    case 'USER_ADDRESSES_SUCCESS':
      return { loading: false, addresses: action.payload };
    case 'USER_ADDRESSES_FAIL':
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
