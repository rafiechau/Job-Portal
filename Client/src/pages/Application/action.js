import { APPLY_FOR_JOB_FAILURE, APPLY_FOR_JOB_REQUEST, APPLY_FOR_JOB_SUCCESS, CHECK_APPLICATION_REQUEST } from './constants';

export const applyForJobRequest = (jobId, formData) => ({
  type: APPLY_FOR_JOB_REQUEST,
  payload: { jobId, formData },
});

export const applyForJobSuccess = (response) => ({
  type: APPLY_FOR_JOB_SUCCESS,
  payload: response,
});

export const applyForJobFailure = (error) => ({
  type: APPLY_FOR_JOB_FAILURE,
  payload: error,
});

export const checkApplicationRequest = (jobId) => ({
  type: CHECK_APPLICATION_REQUEST,
  payload: jobId,
});