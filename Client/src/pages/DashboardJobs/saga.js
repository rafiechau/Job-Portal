import { call, put, takeLatest } from 'redux-saga/effects';
import { deleteJobApi, getAllJobsByUserId } from '@domain/api';
import { deleteJobFailure, deleteJobSuccess, getAllJobsFailure, getAllJobsRequest, getAllJobsSuccess } from './actions';
import { DELETE_JOB_REQUEST, GET_ALL_JOBS_BY_USERID_REQUEST } from './constants';

function* getAllJobsSaga() {
  try {
    const jobs = yield call(getAllJobsByUserId);
    // console.log(jobs);
    yield put(getAllJobsSuccess(jobs.data));
  } catch (error) {
    console.log(error);
    yield put(getAllJobsFailure(error.message));
  }
}

function* deleteJobSaga(action) {
  try {
    const jobId = action.payload;
    console.log(jobId);
    const response = yield call(deleteJobApi, jobId);
    yield put(deleteJobSuccess(response.data));
    yield put(getAllJobsRequest(getAllJobsByUserId));
  } catch (error) {
    yield put(deleteJobFailure(error.message));
  }
}

export default function* watchAllJobs() {
  yield takeLatest(GET_ALL_JOBS_BY_USERID_REQUEST, getAllJobsSaga);
  yield takeLatest(DELETE_JOB_REQUEST, deleteJobSaga);
  // yield takeLatest(UPDATE_JOB_REQUEST, updateJobSaga);
}
