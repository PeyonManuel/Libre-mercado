export const userDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'USER_DETAILS_REQUEST':
      return { loading: true };
    case 'USER_DETAILS_SUCCESS':
      return { loading: false, user: action.payload };
    case 'USER_DETAILS_FAIL':
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userCheckNameReducer = (state = {}, action) => {
  switch (action.type) {
    case 'USER_CHECKNAME_REQUEST':
      return { loading: true };
    case 'USER_CHECKNAME_SUCCESS':
      return { loading: false, user: action.payload, success: true };
    case 'USER_CHECKNAME_FAIL':
      return { loading: false, error: action.payload };
    case 'USER_CHECKNAME_RESET_SUCCESS':
      return { ...state, success: null };
    case 'USER_CHECKNAME_RESET':
      return {};
    default:
      return state;
  }
};

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case 'USER_LOGIN_REQUEST':
      return { loading: true };
    case 'USER_LOGIN_SUCCESS':
      return { loading: false, user: action.payload, success: true };
    case 'USER_LOGIN_FAIL':
      return { loading: false, error: action.payload };
    case 'USER_LOGIN_RESET':
      return {};
    default:
      return state;
  }
};

export const userUpdateFavoritesReducer = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_USER_FAVORITES_REQUEST':
      return { loading: true };
    case 'UPDATE_USER_FAVORITES_SUCCESS':
      return { loading: false, user: action.payload };
    case 'UPDATE_USER_FAVORITES_FAIL':
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userVerifyEmailExistsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'USER_VERIFYEMAILEXISTS_REQUEST':
      return { loading: true };
    case 'USER_VERIFYEMAILEXISTS_SUCCESS':
      return { loading: false, checkedEmail: action.payload, success: true };
    case 'USER_VERIFYEMAILEXISTS_FAIL':
      return { loading: false, error: action.payload };
    case 'USER_VERIFYEMAILEXISTS_RESET_SUCCESS':
      return { ...state, success: null };
    case 'USER_VERIFYEMAILEXISTS_RESET':
      return {};
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case 'USER_REGISTER_REQUEST':
      return { loading: true };
    case 'USER_REGISTER_SUCCESS':
      return { loading: false, user: action.payload };
    case 'USER_REGISTER_FAIL':
      return { loading: false, error: action.payload };
    case 'USER_REGISTER_RESET':
      return {};
    default:
      return state;
  }
};

export const userUpdateProductsDraftsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'USER_UPDATE_PRODUCT_DRAFTS_REQUEST':
      return { loading: true };
    case 'USER_UPDATE_PRODUCT_DRAFTS_SUCCESS':
      return { loading: false, user: action.payload };
    case 'USER_UPDATE_PRODUCT_DRAFTS_FAIL':
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userDeleteProductDraftsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'USER_DELETE_PRODUCT_DRAFTS_REQUEST':
      return { loading: true };
    case 'USER_DELETE_PRODUCT_DRAFTS_SUCCESS':
      return { loading: false, user: action.payload, deleted: true };
    case 'USER_DELETE_PRODUCT_DRAFTS_FAIL':
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userAddProductsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'USER_ADD_PRODUCTS_REQUEST':
      return { loading: true };
    case 'USER_ADD_PRODUCTS_SUCCESS':
      return { loading: false, added: true };
    case 'USER_ADD_PRODUCTS_FAIL':
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userUpdateAddressesReducer = (state = {}, action) => {
  switch (action.type) {
    case 'USER_UPDATE_ADDRESSES_REQUEST':
      return { loading: true };
    case 'USER_UPDATE_ADDRESSES_SUCCESS':
      return { loading: false, user: action.payload };
    case 'USER_UPDATE_ADDRESSES_FAIL':
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userDeleteAddressesReducer = (state = {}, action) => {
  switch (action.type) {
    case 'USER_DELETE_ADDRESSES_REQUEST':
      return { loading: true };
    case 'USER_DELETE_ADDRESSES_SUCCESS':
      return { loading: false, user: action.payload };
    case 'USER_DELETE_ADDRESSES_FAIL':
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
