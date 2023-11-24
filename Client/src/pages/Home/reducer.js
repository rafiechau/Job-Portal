import { produce } from 'immer';
import { FETCH_ALL_JOBS_REQUEST, FETCH_ALL_JOBS_SUCCESS, FETCH_ALL_JOBS_FAILURE } from './constants';

const initialState = {
  loading: false,
  jobs: [],
  error: null,
};

const jobReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case FETCH_ALL_JOBS_REQUEST:
        draft.loading = true;
        break;
      case FETCH_ALL_JOBS_SUCCESS:
        draft.loading = false;
        draft.jobs = action.payload;
        break;
      case FETCH_ALL_JOBS_FAILURE:
        draft.loading = false;
        draft.error = action.payload;
        break;
    }
  });

export default jobReducer;
