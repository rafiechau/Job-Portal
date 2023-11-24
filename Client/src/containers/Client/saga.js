import { takeLatest, call, put } from 'redux-saga/effects';
import { loginApi } from '@domain/api';
import { loginError, loginSuccess } from './actions';
import { LOGIN_REQUEST } from './constants';

export function* handleLogin(action) {
  try {
    // console.log(action);
    const response = yield call(loginApi, action.credentials);
    // console.log(response.data);
    yield put(loginSuccess(response.token));
  } catch (error) {
    console.error('Error during login:', error);
    if (error.response && error.response.data.message === 'Invalid email or password') {
      yield put(loginError('Invalid email or password'));
      // yield put(showPopup());
    } else {
      yield put(loginError(error.toString()));
    }
    // yield put(loginError(error.message));
  }
}

export default function* loginSaga() {
  yield takeLatest(LOGIN_REQUEST, handleLogin);
}
