import { call, put, takeLatest } from 'redux-saga/effects';
import { getAllJobs } from '@domain/api';
import { FETCH_ALL_JOBS_REQUEST } from './constants';
import { fetchAllJobsFailure, fetchAllJobsSuccess } from './actions';

export function* fetchAllJobsSaga() {
  try {
    const response = yield call(getAllJobs);
    console.log('Response from getJobsApi:', response);
    if (response && response.data) {
      yield put(fetchAllJobsSuccess(response.data));
    } else {
      yield put(fetchAllJobsFailure('No data received'));
    }
  } catch (error) {
    yield put(fetchAllJobsFailure(error.message));
  }
}

export default function* jobSaga() {
  yield takeLatest(FETCH_ALL_JOBS_REQUEST, fetchAllJobsSaga);
}
