import axios from 'axios';
import {
  CLEAR_ERRORS,
  LOAD_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_FAILURE,
  LOGOUT_SUCCESS,
  REGISTER_USER_FAILURE,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  UPDATE_PROFILE_FAILURE,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAILURE,
  FORGOT_PASSWORD_FAILURE,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,
} from '../../contants';

const baseUrl = 'http://localhost:5555';

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'access-control-allow-origin': 'http://localhost:3000',
      },
      withCredentials: true,
    };

    const { data } = await axios.post(
      `${baseUrl}/api/v1/user/login`,
      {
        email,
        password,
      },
      config
    );

    dispatch({ type: LOGIN_SUCCESS, payload: data.user });
  } catch (error) {
    console.log(error);
    dispatch({ type: LOGIN_FAILURE, payload: error.response.data.message });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });

    const config = { headers: { 'Content-Type': 'multipart/form-data' }, withCredentials: true };

    const { data } = await axios.post(`${baseUrl}/api/v1/user/register`, userData, config);

    dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: REGISTER_USER_FAILURE, payload: error.response.data.message });
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'access-control-allow-origin': 'http://localhost:3000',
      },
      withCredentials: true,
    };

    const { data } = await axios.get(`${baseUrl}/api/v1/user/me`, config);

    dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.message });
  }
};

export const logout = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'access-control-allow-origin': 'http://localhost:3000',
      },
      withCredentials: true,
    };
    await axios.get(`${baseUrl}/api/v1/user/logout`, config);

    dispatch({ type: LOGOUT_SUCCESS });
  } catch (error) {
    dispatch({ type: LOGOUT_FAILURE, payload: error.response.data.message });
  }
};

export const updateProfile = (userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PROFILE_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
        'access-control-allow-origin': 'http://localhost:3000',
      },
      withCredentials: true,
    };

    const { data } = await axios.put(`${baseUrl}/api/v1/user/me/update`, userData, config);

    dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({ type: UPDATE_PROFILE_FAILURE, payload: error.response.data.message });
  }
};

export const updatePassword = (password) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PASSWORD_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
        'access-control-allow-origin': 'http://localhost:3000',
      },
      withCredentials: true,
    };

    const { data } = await axios.put(`${baseUrl}/api/v1/user/password/update`, password, config);

    dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({ type: UPDATE_PASSWORD_FAILURE, payload: error.response.data.message });
  }
};

export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:3000',
      },
      withCredentials: true,
    };

    const { data } = await axios.post(`${baseUrl}/api/v1/user/change-password`, email, config);

    dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({ type: FORGOT_PASSWORD_FAILURE, payload: error.response.data.message });
  }
};

export const resetPassword = (token, password) => async (dispatch) => {
  try {
    dispatch({ type: RESET_PASSWORD_REQUEST });
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:3000',
      },
      withCredentials: true,
    };

    const { data } = await axios.put(
      `${baseUrl}/api/v1/user/password/reset/${token}`,
      password,
      config
    );

    dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({ type: RESET_PASSWORD_FAILURE, payload: error.response.data.message });
  }
};
