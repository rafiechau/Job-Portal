import { produce } from 'immer';
import { CREATE_JOB, RESET_ADD_JOB, SET_NEW_JOB, UPDATE_JOB } from './constants';

export const initialState = {
  jobs: [],
  createDataStatus: false,
  updatedJobStatus: false,
};

const addJobReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case CREATE_JOB:
        // Menambahkan task baru ke dalam array 'tasks'
        draft.jobs.push(action.data);
        draft.createDataStatus = true;
        break;
      case UPDATE_JOB:
        // Mencari dan memperbarui task berdasarkan ID
        // eslint-disable-next-line no-case-declarations
        const jobIndex = draft.jobs.findIndex((job) => job.id === action.jobId);
        if (jobIndex !== -1) {
          draft.jobs[jobIndex] = { ...draft.jobs[jobIndex], ...action.data };
        }
        draft.createDataStatus = true;
        break;
      case SET_NEW_JOB:
        draft.createDataStatus = true;
        break;
      case RESET_ADD_JOB:
        draft.createDataStatus = false;
        draft.updatedJobStatus = false;
        break;
    }
  });

export default addJobReducer;
