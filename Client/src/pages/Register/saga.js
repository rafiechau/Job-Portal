import { registerSuccess } from '@pages/Register/actions';
import { REGISTER_REQUEST } from '@pages/Register/constants';
import { registerApi } from '@domain/api';
import { call, put, takeLatest } from 'redux-saga/effects';
import { registerError } from './actions';

function* registerSaga(action) {
  try {
    console.log(action, "test")
    const response = yield call(registerApi, action.data);
    console.log('Response from register API:', response);
    yield put(registerSuccess(response));
  } catch (error) {
    console.log(error.message, 'saga register');
    if (error.response && error.response.data.message === 'Email sudah digunakan') {
      yield put(registerError('User already registered'));
      // yield put(showPopup());
    } else {
      yield put(registerError(error.toString()));
    }
  }
}

export default function* watchRegisterSaga() {
  yield takeLatest(REGISTER_REQUEST, registerSaga);
}
