import { CREATE_JOB, RESET_ADD_JOB, SET_NEW_JOB, SET_UPDATE_JOB, UPDATE_JOB } from './constants';

export const createJob = (data) => ({
  type: CREATE_JOB,
  data,
});
export const updateJob = (jobId, data) => ({
  type: UPDATE_JOB,
  payload: { jobId, data },
});
export const setNewJob = () => ({
  type: SET_NEW_JOB,
});
export const setUpdatepJob = () => ({
  type: SET_UPDATE_JOB,
});
export const resetAddJob = () => ({
  type: RESET_ADD_JOB,
});
