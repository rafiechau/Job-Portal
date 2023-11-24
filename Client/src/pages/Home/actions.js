import { FETCH_ALL_JOBS_FAILURE, FETCH_ALL_JOBS_REQUEST, FETCH_ALL_JOBS_SUCCESS } from "./constants";

export const fetchAllJobsRequest = () => ({
  type: FETCH_ALL_JOBS_REQUEST,
});

export const fetchAllJobsSuccess = (jobs) => ({
  type: FETCH_ALL_JOBS_SUCCESS,
  payload: jobs,
});

export const fetchAllJobsFailure = (error) => ({
  type: FETCH_ALL_JOBS_FAILURE,
  payload: error,
});
