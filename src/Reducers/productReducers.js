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

export const newProductReducer = (state = { loading: true }, action) => {
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

export const deleteProductReducer = (state = { loading: true }, action) => {
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
