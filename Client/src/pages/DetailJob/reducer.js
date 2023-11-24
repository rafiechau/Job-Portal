import { produce } from 'immer';
import { FETCH_JOB_DETAIL_REQUEST, FETCH_JOB_DETAIL_SUCCESS, FETCH_JOB_DETAIL_FAILURE } from './constants';

const initialState = {
  loading: false,
  jobDetail: {},
  error: null,
};

const jobDetailReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case FETCH_JOB_DETAIL_REQUEST:
        draft.loading = true;
        break;
      case FETCH_JOB_DETAIL_SUCCESS:
        draft.loading = false;
        draft.jobDetail = action.payload;
        break;
      case FETCH_JOB_DETAIL_FAILURE:
        draft.loading = false;
        draft.error = action.payload;
        break;
    }
  });

export default jobDetailReducer;
