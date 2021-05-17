export const productListReducer = (
  state = { loading: true, products: [] },
  action
) => {
  switch (action.type) {
    case 'PRODUCT_LIST_REQUEST':
      return { loading: true };
    case 'PRODUCT_LIST_SUCCESS':
      return { loading: false, products: action.payload };
    case 'PRODUCT_LIST_FAIL':
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const customProductListReducer = (
  state = { loading: true, products: [] },
  action
) => {
  switch (action.type) {
    case 'CUSTOM_PRODUCT_LIST_REQUEST':
      return { loading: true };
    case 'CUSTOM_PRODUCT_LIST_SUCCESS':
      return { loading: false, products: action.payload };
    case 'CUSTOM_PRODUCT_LIST_FAIL':
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case 'PRODUCT_DETAILS_REQUEST':
      return { loading: true };
    case 'PRODUCT_DETAILS_SUCCESS':
      return { loading: false, product: action.payload };
    case 'PRODUCT_DETAILS_FAIL':
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const newProductReducer = (state = {}, action) => {
  switch (action.type) {
    case 'NEW_PRODUCT_REQUEST':
      return { loading: true };
    case 'NEW_PRODUCT_SUCCESS':
      return { loading: false, product: action.payload };
    case 'NEW_PRODUCT_FAIL':
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const deleteProductReducer = (state = {}, action) => {
  switch (action.type) {
    case 'NEW_PRODUCT_REQUEST':
      return { loading: true };
    case 'NEW_PRODUCT_SUCCESS':
      return { loading: false, product: action.payload };
    case 'NEW_PRODUCT_FAIL':
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const updateProductReducer = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_PRODUCT_REQUEST':
      return { loading: true };
    case 'UPDATE_PRODUCT_SUCCESS':
      return { loading: false, product: action.payload };
    case 'UPDATE_PRODUCT_FAIL':
      return { loading: false, error: action.payload };
    case 'UPDATE_PRODUCT_RESET':
      return {};
    default:
      return state;
  }
};

export const productAddQuestionReducer = (state = {}, action) => {
  switch (action.type) {
    case 'PRODUCT_ADD_QUESTION_REQUEST':
      return { loading: true };
    case 'PRODUCT_ADD_QUESTION_SUCCESS':
      return { loading: false, product: action.payload };
    case 'PRODUCT_ADD_QUESTION_FAIL':
      return { loading: false, error: action.payload };
    case 'PRODUCT_ADD_QUESTION_RESET':
      return {};
    default:
      return state;
  }
};

export const productAnswerQuestionReducer = (state = {}, action) => {
  switch (action.type) {
    case 'PRODUCT_ANSWER_QUESTION_REQUEST':
      return { loading: true };
    case 'PRODUCT_ANSWER_QUESTION_SUCCESS':
      return { loading: false, product: action.payload };
    case 'PRODUCT_ANSWER_QUESTION_FAIL':
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productGetUserQuestionReducer = (state = {}, action) => {
  switch (action.type) {
    case 'PRODUCT_USER_QUESTIONS_REQUEST':
      return { loading: true };
    case 'PRODUCT_USER_QUESTIONS_SUCCESS':
      return { loading: false, products: action.payload };
    case 'PRODUCT_USER_QUESTIONS_FAIL':
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productIdListReducer = (state = {}, action) => {
  switch (action.type) {
    case 'PRODUCT_ID_LIST_REQUEST':
      return { loading: true };
    case 'PRODUCT_ID_LIST_SUCCESS':
      return { loading: false, products: action.payload };
    case 'PRODUCT_ID_LIST_FAIL':
      return { loading: false, error: action.payload };
    case 'PRODUCT_ID_LIST_RESET':
      return {};
    default:
      return state;
  }
};

export const productsUpdateStockReducer = (state = {}, action) => {
  switch (action.type) {
    case 'PRODUCT_UPDATE_STOCK_REQUEST':
      return { loading: true };
    case 'PRODUCT_UPDATE_STOCK_SUCCESS':
      return { loading: false, products: action.payload, success: true };
    case 'PRODUCT_UPDATE_STOCK_FAIL':
      return { loading: false, error: action.payload };
    case 'PRODUCT_UPDATE_STOCK_RESET':
      return {};
    default:
      return state;
  }
};
