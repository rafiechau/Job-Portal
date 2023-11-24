import { createSelector } from 'reselect';
import { initialState } from './reducer';

export const selectRegister = (state) => state.register || initialState;

export const makeSelectLoading = () => createSelector(selectRegister, (registerState) => registerState.loading);

export const makeSelectisSuccess = () =>
  createSelector(selectRegister, (registerState) => registerState.makeSelectisSuccess);

export const makeSelectError = () => createSelector(selectRegister, (registerState) => registerState.error);

export const makeSelectUserData = () => createSelector(selectRegister, (registerState) => registerState.userData);
