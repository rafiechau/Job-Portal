import { all } from 'redux-saga/effects';

import appSaga from '@containers/App/saga';
import loginSaga from '@containers/Client/saga';
import jobSaga from '@pages/Home/saga';
import jobDetailSaga from '@pages/DetailJob/saga';
import watchRegisterSaga from '@pages/Register/saga';
import watchAllJobs from '@pages/DashboardJobs/saga';
import watchApplyForJob from '@pages/Application/saga';
import { addJobSaga } from '@pages/DashboardEditJob/saga';

export default function* rootSaga() {
  yield all([
    appSaga(),
    loginSaga(),
    jobSaga(),
    jobDetailSaga(),
    watchRegisterSaga(),
    watchAllJobs(),
    watchApplyForJob(),
    addJobSaga(),
  ]);
}
