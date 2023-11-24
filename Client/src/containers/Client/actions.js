import { LOGIN_ERROR, LOGIN_REQUEST, LOGIN_SUCCESS, SET_LOGIN, SET_TOKEN } from '@containers/Client/constants';

export const setLogin = (login) => ({
  type: SET_LOGIN,
  login,
});

export const setToken = (token) => ({
  type: SET_TOKEN,
  token,
});

export const loginRequest = (credentials) => ({
  type: LOGIN_REQUEST,
  credentials,
});

export const loginError = (error) => ({
  type: LOGIN_ERROR,
  error,
});

export const loginSuccess = (token) => ({
  type: LOGIN_SUCCESS,
  token, // biasanya berisi informasi pengguna dan token
});
