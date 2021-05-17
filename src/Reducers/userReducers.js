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
      return { loading: false, user: action.payload };
    case 'USER_LOGIN_FAIL':
      return { loading: false, error: action.payload };
    case 'USER_LOGIN_RESET':
      return {};
    default:
      return state;
  }
};

export const userAuthenticateReducer = (state = {}, action) => {
  switch (action.type) {
    case 'USER_AUTHENTICATE_REQUEST':
      return { loading: true };
    case 'USER_AUTHENTICATE_SUCCESS':
      return { loading: false, success: action.payload.success };
    case 'USER_AUTHENTICATE_FAIL':
      return { loading: false, error: action.payload };
    case 'USER_AUTHENTICATE_RESET':
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
    case 'UPDATE_USER_FAVORITES_RESET':
      return {};
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

export const userUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case 'USER_UPDATE_REQUEST':
      return { loading: true };
    case 'USER_UPDATE_SUCCESS':
      return { loading: false, user: action.payload, success: true };
    case 'USER_UPDATE_FAIL':
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

export const userDeleteProducsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'USER_DELETE_PRODUCTS_REQUEST':
      return { loading: true };
    case 'USER_DELETE_PRODUCTS_SUCCESS':
      return { loading: false, user: action.payload, deleted: true };
    case 'USER_DELETE_PRODUCTS_FAIL':
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
      return { loading: false, added: true, user: action.payload };
    case 'USER_ADD_PRODUCTS_FAIL':
      return { loading: false, added: false, error: action.payload };
    default:
      return state;
  }
};

export const userGetPublishedProductsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'USER_PUBLISHED_PRODUCTS_REQUEST':
      return { loading: true };
    case 'USER_PUBLISHED_PRODUCTS_SUCCESS':
      return { loading: false, products: action.payload };
    case 'USER_PUBLISHED_PRODUCTS_FAIL':
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userUpdateHistoryReducer = (state = {}, action) => {
  switch (action.type) {
    case 'USER_HISTORY_UPDATE_REQUEST':
      return { loading: true };
    case 'USER_HISTORY_UPDATE_SUCCESS':
      return { loading: false, user: action.payload };
    case 'USER_HISTORY_UPDATE_FAIL':
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userGetHistoryDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'USER_HISTORY_REQUEST':
      return { loading: true };
    case 'USER_HISTORY_SUCCESS':
      return { loading: false, history: action.payload };
    case 'USER_HISTORY_FAIL':
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userRemoveHistoryReducer = (state = {}, action) => {
  switch (action.type) {
    case 'USER_HISTORY_REMOVE_REQUEST':
      return { loading: true };
    case 'USER_HISTORY_REMOVE_SUCCESS':
      return { loading: false, history: action.payload };
    case 'USER_HISTORY_REMOVE_FAIL':
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userPushNotificationReducer = (state = {}, action) => {
  switch (action.type) {
    case 'USER_PUSH_NOTIFICATION_REQUEST':
      return { loading: true };
    case 'USER_PUSH_NOTIFICATION_SUCCESS':
      return { loading: false, user: action.payload };
    case 'USER_PUSH_NOTIFICATION_FAIL':
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userDeleteNotificationReducer = (state = {}, action) => {
  switch (action.type) {
    case 'USER_DELETE_NOTIFICATION_REQUEST':
      return { loading: true };
    case 'USER_DELETE_NOTIFICATION_SUCCESS':
      return { loading: false, success: true };
    case 'USER_DELETE_NOTIFICATION_FAIL':
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userUpdateCartReducer = (state = {}, action) => {
  switch (action.type) {
    case 'USER_CART_UPDATE_REQUEST':
      return { loading: true };
    case 'USER_CART_UPDATE_SUCCESS':
      return { loading: false, success: true, item: action.payload };
    case 'USER_CART_UPDATE_FAIL':
      return { loading: false, error: action.payload };
    case 'USER_CART_UPDATE_RESET':
      return {};
    default:
      return state;
  }
};

export const usergetCartDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'USER_CART_REQUEST':
      return { loading: true };
    case 'USER_CART_SUCCESS':
      return { loading: false, cart: action.payload };
    case 'USER_CART_FAIL':
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userCartRemoveMultipleReducer = (state = {}, action) => {
  switch (action.type) {
    case 'USER_CART_REMOVE_MULTIPLE_REQUEST':
      return { loading: true };
    case 'USER_CART_REMOVE_MULTIPLE_SUCCESS':
      return { loading: false, success: true };
    case 'USER_CART_REMOVE_MULTIPLE_FAIL':
      return { loading: false, error: action.payload };
    case 'USER_CART_REMOVE_MULTIPLE_RESET':
      return {};
    default:
      return state;
  }
};
