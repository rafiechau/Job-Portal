import { produce } from 'immer';
import {
  DELETE_JOB_FAILURE,
  DELETE_JOB_REQUEST,
  DELETE_JOB_SUCCESS,
  GET_ALL_JOBS_BY_USERID_FAILURE,
  GET_ALL_JOBS_BY_USERID_REQUEST,
  GET_ALL_JOBS_BY_USERID_SUCCESS,
} from './constants';

const initialState = {
  jobs: [],
  isLoading: false,
  error: null,
};

const dashboardJobsReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case GET_ALL_JOBS_BY_USERID_REQUEST:
        draft.isLoading = true;
        break;
      case GET_ALL_JOBS_BY_USERID_SUCCESS:
        draft.isLoading = false;
        draft.jobs = action.payload || [];
        break;
      case GET_ALL_JOBS_BY_USERID_FAILURE:
        draft.isLoading = false;
        draft.error = action.payload;
        break;
      case DELETE_JOB_REQUEST:
        draft.isLoading = true;
        break;
      case DELETE_JOB_SUCCESS:
        draft.isLoading = false;
        draft.jobs = draft.jobs.filter((job) => job.id !== action.payload);
        break;
      case DELETE_JOB_FAILURE:
        draft.isLoading = false;
        draft.error = action.payload;
        break;
    }
  });

export default dashboardJobsReducer;
