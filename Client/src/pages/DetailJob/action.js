import { FETCH_JOB_DETAIL_FAILURE, FETCH_JOB_DETAIL_REQUEST, FETCH_JOB_DETAIL_SUCCESS } from './constants';

export const fetchJobDetailRequest = (id) => ({
  type: FETCH_JOB_DETAIL_REQUEST,
  payload: id,
});

export const fetchJobDetailSuccess = (jobDetail) => ({
  type: FETCH_JOB_DETAIL_SUCCESS,
  payload: jobDetail,
});

export const fetchJobDetailFailure = (error) => ({
  type: FETCH_JOB_DETAIL_FAILURE,
  payload: error,
});
