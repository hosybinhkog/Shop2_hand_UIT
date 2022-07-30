import axios from 'axios';

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
  ADMIN_PRODUCT_REQUEST,
  ADMIN_PRODUCT_FAIL,
  ADMIN_PRODUCT_SUCCESS,
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_SUCCESS,
  NEW_PRODUCT_FAIL,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_FAIL,
  UPDATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  ALL_PRODUCTRESELL_REQUESTS,
  ALL_PRODUCTRESELL_SUCCESS,
  ALL_PRODUCTRESELL_FAILURE,
} from '../../contants';

const baseUrl = 'http://localhost:5555';

export const getProduct =
  (keyword = '', currentPage = 1, categories) =>
  async (dispatch) => {
    try {
      dispatch({
        type: ALL_PRODUCT_REQUESTS,
      });

      let url = `${baseUrl}/api/v1/product?page=${currentPage}&keyword=${keyword}`;

      if (categories) {
        url = `${baseUrl}/api/v1/product?page=${currentPage}&keyword=${keyword}&category=${categories}`;
      }

      const { data } = await axios.get(url);

      dispatch({
        type: ALL_PRODUCT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_PRODUCT_FAILURE,
        payload: error.response.data.message,
      });
    }
  };

export const getProductResell = () => async (dispatch) => {
  try {
    dispatch({
      type: ALL_PRODUCTRESELL_REQUESTS,
    });

    let url = `${baseUrl}/api/v1/product/resell`;

    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    const { data } = await axios.get(url, config);

    dispatch({
      type: ALL_PRODUCTRESELL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_PRODUCTRESELL_FAILURE,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

export const getDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: ALL_DETAIL_REQUESTS });

    const { data } = await axios.get(`${baseUrl}/api/v1/product/${id}`);

    dispatch({
      type: ALL_DETAIL_SUCCESS,
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: ALL_DETAIL_FAILURE,
      payload: error.response.data.message,
    });
  }
};

export const newReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_REVIEW_REQUEST });
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    const { data } = await axios.put(`${baseUrl}/api/v1/product/review`, reviewData, config);

    dispatch({ type: NEW_REVIEW_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({ type: NEW_REVIEW_FAIL, payload: error.response.data.error });
  }
};

export const getAdminProducts = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_PRODUCT_REQUEST });

    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    const { data } = await axios.get(`${baseUrl}/api/v1/product/admin`, config);

    dispatch({ type: ADMIN_PRODUCT_SUCCESS, payload: data.products });
  } catch (error) {
    dispatch({
      type: ADMIN_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const createProduct = (productData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_PRODUCT_REQUEST });

    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    const { data } = await axios.post(`${baseUrl}/api/v1/product`, productData, config);

    dispatch({ type: NEW_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: NEW_PRODUCT_FAIL, payload: error.response.data.message });
  }
};

export const createProductResell = (productData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_PRODUCT_REQUEST });

    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    const { data } = await axios.post(`${baseUrl}/api/v1/product/resell`, productData, config);

    dispatch({ type: NEW_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: NEW_PRODUCT_FAIL, payload: error.response.data.message });
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCT_REQUEST });

    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    const { data } = await axios.delete(`${baseUrl}/api/v1/product/delete/${id}`, config);

    dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({ type: DELETE_PRODUCT_FAIL, payload: error.response.data.message });
  }
};

export const updateProduct = (id, productData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PRODUCT_REQUEST });

    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    const { data } = await axios.put(`${baseUrl}/api/v1/product/${id}`, productData, config);

    dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({ type: UPDATE_PRODUCT_FAIL, payload: error.response.data.message });
  }
};
