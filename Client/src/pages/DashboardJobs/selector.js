import { createSelector } from 'reselect';

const selectJobsState = (state) => state.dashboardJobs;

export const selectAllJobs = createSelector(selectJobsState, (jobsState) => jobsState.jobs);

export const selectJobsLoading = createSelector(selectJobsState, (jobsState) => jobsState.isLoading);

export const selectJobsError = createSelector(selectJobsState, (jobsState) => jobsState.error);
