import {
  ALL_PRODUCT_FAILURE,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_REQUESTS,
  CLEAR_ERRORS,
  ALL_DETAIL_FAILURE,
  ALL_DETAIL_REQUESTS,
  ALL_DETAIL_SUCCESS,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  NEW_REVIEW_RESET,
  ADMIN_PRODUCT_REQUEST,
  ADMIN_PRODUCT_FAIL,
  ADMIN_PRODUCT_SUCCESS,
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_SUCCESS,
  NEW_PRODUCT_FAIL,
  NEW_PRODUCT_RESET,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_RESET,
  UPDATE_PRODUCT_REQUEST,
  DELETE_PRODUCT_FAIL,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_RESET,
  ALL_PRODUCTRESELL_REQUESTS,
  ALL_PRODUCTRESELL_SUCCESS,
  ALL_PRODUCTRESELL_FAILURE,
} from '../../contants';

const productReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case ALL_PRODUCT_REQUESTS:
    case ADMIN_PRODUCT_REQUEST:
      return {
        loading: true,
        products: [],
      };
    case ALL_PRODUCT_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        productsCount: action.payload.productsCount,
        resultPerPage: action.payload.resultPerPage,
        filteredProductsCount: action.payload.filteredProductsCount,
      };
    case ADMIN_PRODUCT_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };
    case ALL_PRODUCT_FAILURE:
    case ADMIN_PRODUCT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return {
        ...state,
      };
  }
};

export default productReducer;

export const productDetailsReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case ALL_DETAIL_REQUESTS:
      return {
        loading: true,
        ...state,
      };
    case ALL_DETAIL_SUCCESS:
      return {
        loading: false,
        product: action.payload,
      };
    case ALL_DETAIL_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return {
        ...state,
      };
  }
};

export const newReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case NEW_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_REVIEW_SUCCESS:
      return {
        ...state,
        success: action.payload,
      };
    case NEW_REVIEW_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case NEW_REVIEW_RESET:
      return {
        ...state,
        success: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return {
        ...state,
      };
  }
};

export const newProductReducer = (state = { product: {} }, action) => {
  switch (state.type) {
    case NEW_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_PRODUCT_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        product: action.payload.product,
      };
    case NEW_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case NEW_PRODUCT_RESET:
      return {
        ...state,
        success: false,
      };
    default:
      return {
        ...state,
      };
  }
};

export const productReducerSingle = (state, action) => {
  switch (action.type) {
    case DELETE_PRODUCT_REQUEST:
    case UPDATE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };
    case UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdate: action.payload,
      };
    case DELETE_PRODUCT_FAIL:
    case UPDATE_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_PRODUCT_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case UPDATE_PRODUCT_RESET:
      return {
        ...state,
        isUpdated: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return { ...state };
  }
};

export const productReducerResell = (state = { productResell: [] }, action) => {
  switch (action.type) {
    case ALL_PRODUCTRESELL_REQUESTS:
      return {
        loading: true,
        productResell: [],
      };
    case ALL_PRODUCTRESELL_SUCCESS:
      return {
        loading: false,
        productResell: action.payload.productResell,
      };
    case ALL_PRODUCTRESELL_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return {
        ...state,
      };
  }
};
