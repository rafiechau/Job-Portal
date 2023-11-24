import { combineReducers } from 'redux';

import appReducer, { storedKey as storedAppState } from '@containers/App/reducer';
import clientReducer, { storedKey as storedClientState } from '@containers/Client/reducer';
import languageReducer from '@containers/Language/reducer';

import jobReducer from '@pages/Home/reducer';
import jobDetailReducer from '@pages/DetailJob/reducer';
import registerReducer from '@pages/Register/reducer';
import applyJobReducer from '@pages/Application/reducer';
import dashboardJobsReducer from '@pages/DashboardJobs/reducer';
import addJobReducer from '@pages/DashboardEditJob/reducer';
import { mapWithPersistor } from './persistence';

const storedReducers = {
  app: { reducer: appReducer, whitelist: storedAppState },
  client: { reducer: clientReducer, whitelist: storedClientState },
  Job: { reducer: jobReducer },
  jobDetail: { reducer: jobDetailReducer },
  register: { reducer: registerReducer },
  dashboardJobs: { reducer: dashboardJobsReducer },
  applyJobs: { reducer: applyJobReducer },
  addJob: { reducer: addJobReducer },
};

const temporaryReducers = {
  language: languageReducer,
};

const createReducer = () => {
  const coreReducer = combineReducers({
    ...mapWithPersistor(storedReducers),
    ...temporaryReducers,
  });
  const rootReducer = (state, action) => coreReducer(state, action);
  return rootReducer;
};

export default createReducer;