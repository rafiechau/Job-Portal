import { call, put, takeLatest } from 'redux-saga/effects';
import { getDetailJob } from '@domain/api';
import { fetchJobDetailFailure, fetchJobDetailSuccess } from './action';
import { FETCH_JOB_DETAIL_REQUEST } from './constants';

function* fetchJobDetailSaga(action) {
  try {
    // console.log(action)
    const jobDetail = yield call(getDetailJob, action.payload);
    console.log(jobDetail)
    yield put(fetchJobDetailSuccess(jobDetail));
  } catch (error) {
    console.log(error, 'error di saga');
    yield put(fetchJobDetailFailure(error.message));
  }
}

export default function* jobDetailSaga() {
  yield takeLatest(FETCH_JOB_DETAIL_REQUEST, fetchJobDetailSaga);
}
