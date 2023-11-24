import { produce } from 'immer';
import { REGISTER_ERROR, REGISTER_REQUEST, REGISTER_SUCCESS } from './constants';

export const initialState = {
  loading: false,
  error: false,
  userData: null,
};

const registerReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case REGISTER_REQUEST:
        draft.loading = true;
        draft.error = false;
        draft.userData = null;
        break;
      case REGISTER_SUCCESS:
        draft.loading = false;
        draft.userData = action.response;
        break;
      case REGISTER_ERROR:
        draft.loading = false;
        draft.error = action.error;
        break;
    }
  });

export default registerReducer;
