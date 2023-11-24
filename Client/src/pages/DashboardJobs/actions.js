import {
  DELETE_JOB_FAILURE,
  DELETE_JOB_REQUEST,
  DELETE_JOB_SUCCESS,
  GET_ALL_JOBS_BY_USERID_FAILURE,
  GET_ALL_JOBS_BY_USERID_REQUEST,
  GET_ALL_JOBS_BY_USERID_SUCCESS,
} from './constants';

export const getAllJobsRequest = () => ({
  type: GET_ALL_JOBS_BY_USERID_REQUEST,
});

export const getAllJobsSuccess = (jobs) => ({
  type: GET_ALL_JOBS_BY_USERID_SUCCESS,
  payload: Array.isArray(jobs) ? jobs : [],
});

export const getAllJobsFailure = (error) => ({
  type: GET_ALL_JOBS_BY_USERID_FAILURE,
  payload: error,
});

export const deleteJobRequest = (jobId) => ({
  type: DELETE_JOB_REQUEST,
  payload: jobId,
});

export const deleteJobSuccess = (jobId) => ({
  type: DELETE_JOB_SUCCESS,
  payload: jobId,
});

export const deleteJobFailure = (error) => ({
  type: DELETE_JOB_FAILURE,
  payload: error,
});

// export const updateJobRequest = (jobId, jobData) => ({
//   type: UPDATE_JOB_REQUEST,
//   payload: { jobId, jobData },
// });

// export const updateJobSuccess = (job) => ({
//   type: UPDATE_JOB_SUCCESS,
//   payload: job,
// });

// export const updateJobFailure = (error) => ({
//   type: UPDATE_JOB_FAILURE,
//   payload: error,
// });

// export const setNewJob = () => ({
//   type: SET_NEW_JOB,
// });

// export const setUpdatepJob = () => ({
//   type: SET_UPDATE_JOB,
// });
// export const resetAddJob = () => ({
//   type: RESET_ADD_JOB,
// });

// export const createJob = (data) => ({
//   type: CREATE_JOB,
//   data,
// });
