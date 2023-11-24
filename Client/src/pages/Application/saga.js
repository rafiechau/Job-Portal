import { applyForJobApi, checkUserApplicationApi } from '@domain/api';
import { call, put, takeLatest } from 'redux-saga/effects';
import { applyForJobFailure, applyForJobSuccess } from './action';
import {
  APPLY_FOR_JOB_REQUEST,
  CHECK_APPLICATION_FAILURE,
  CHECK_APPLICATION_REQUEST,
  CHECK_APPLICATION_SUCCESS,
} from './constants';

function* applyForJobSaga(action) {
  try {
    const { jobId, formData } = action.payload;
    const response = yield call(applyForJobApi, jobId, formData);
    yield put(applyForJobSuccess(response));
  } catch (error) {
    yield put(applyForJobFailure(error.message));
  }
}

function* checkApplicationSaga(action) {
  try {
    const response = yield call(checkUserApplicationApi, action.payload);
    yield put({ type: CHECK_APPLICATION_SUCCESS, payload: response });
  } catch (error) {
    yield put({ type: CHECK_APPLICATION_FAILURE, payload: error.message });
  }
}

export default function* watchApplyForJob() {
  yield takeLatest(APPLY_FOR_JOB_REQUEST, applyForJobSaga);
  yield takeLatest(CHECK_APPLICATION_REQUEST, checkApplicationSaga);
}
