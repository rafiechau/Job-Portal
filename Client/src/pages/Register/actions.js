import { REGISTER_ERROR, REGISTER_REQUEST, REGISTER_SUCCESS } from './constants';

export function registerRequest(data) {
  return {
    type: REGISTER_REQUEST,
    data,
  };
}

export function registerSuccess(response) {
  return {
    type: REGISTER_SUCCESS,
    response,
  };
}

export function registerError(error) {
  return {
    type: REGISTER_ERROR,
    error,
  };
}
