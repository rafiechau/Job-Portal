import { produce } from 'immer';

import { LOGIN_ERROR, LOGIN_REQUEST, LOGIN_SUCCESS, SET_LOGIN, SET_TOKEN } from '@containers/Client/constants';

export const initialState = {
  isLoading: false,
  isLoggedIn: false,
  token: null,
  error: null,
};

export const storedKey = ['token', 'isLoggedIn'];

const clientReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case LOGIN_REQUEST:
        draft.isLoading = true;
        draft.error = null;
        break;
      case LOGIN_SUCCESS:
        draft.isLoading = false;
        draft.isLoggedIn = true;
        // console.log(action.token);
        draft.token = action.token; // Asumsikan userData memiliki field token
        break;
      case LOGIN_ERROR:
        draft.isLoading = false;
        draft.error = action.error;
        break;
      case SET_LOGIN:
        draft.isLoggedIn = action.login;
        break;
      case SET_TOKEN:
        draft.token = action.token;
        break;
      // Tambahkan case lain jika diperlukan
      default:
        break;
    }
  });

export default clientReducer;
