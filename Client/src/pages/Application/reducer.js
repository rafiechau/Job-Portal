import { produce } from 'immer';
import {
  APPLY_FOR_JOB_FAILURE,
  APPLY_FOR_JOB_REQUEST,
  APPLY_FOR_JOB_SUCCESS,
  CHECK_APPLICATION_SUCCESS,
} from './constants';

const initialState = {
  isLoading: false,
  success: false,
  error: null,
  hasApplied: false,
};

const applyJobReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case APPLY_FOR_JOB_REQUEST:
        draft.isLoading = true;
        draft.success = false;
        draft.error = null;
        break;
      case APPLY_FOR_JOB_SUCCESS:
        draft.isLoading = false;
        draft.success = true;
        draft.error = null;
        break;
      case APPLY_FOR_JOB_FAILURE:
        draft.isLoading = false;
        draft.success = false;
        draft.error = action.payload;
        break;
      case CHECK_APPLICATION_SUCCESS:
        draft.hasApplied = action.payload.hasApplied;
        break;
    }
  });

export default applyJobReducer;
