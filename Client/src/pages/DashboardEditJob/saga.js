import { call, put, takeLatest } from 'redux-saga/effects';
import { createJob, getAllJobsByUserId, updateJob } from '@domain/api';
import { getAllJobsRequest } from '@pages/DashboardJobs/actions';
import { setNewJob, setUpdatepJob } from './actions';
import { CREATE_JOB, UPDATE_JOB } from './constants';

export function* doCreateJob({ data }) {
  try {
    const response = yield call(createJob, data);
    if (response) {
      yield put(setNewJob());
      yield put(getAllJobsRequest(getAllJobsByUserId));
    }
  } catch (error) {
    alert('Create Job Error', +error.message);
  }
}
export function* doUpdateJob(action) {
  try {
    console.log(action.payload);
    const { jobId, data } = action.payload;
    console.log('Updating job with ID:', jobId, 'and data:', data);
    const response = yield call(updateJob, jobId, data);
    if (response) {
      yield put(setUpdatepJob(response));
      yield put(getAllJobsRequest(getAllJobsByUserId));
    }
  } catch (error) {
    console.log(error.message);
    alert(`ada yang salah dari saga kamu${  error.message}`);
  }
}

export function* addJobSaga() {
  yield takeLatest(CREATE_JOB, doCreateJob);
  yield takeLatest(UPDATE_JOB, doUpdateJob);
}
