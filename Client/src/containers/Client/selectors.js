import { createSelector } from 'reselect';
import { initialState } from '@containers/Client/reducer';

const selectClientState = (state) => state.client || initialState;

export const selectIsLoggedIn = createSelector(selectClientState, (clientState) => clientState.isLoggedIn);

export const selectIsLoading = createSelector(selectClientState, (clientState) => clientState.isLoading);

export const selectToken = createSelector(selectClientState, (clientState) => clientState.token);

export const selectError = createSelector(selectClientState, (clientState) => clientState.error);
