export const selectJobs = (state) => state.Job?.jobs || [];
export const selectJobsLoading = (state) => state.job.loading;
export const selectJobsError = (state) => state.job.error;
