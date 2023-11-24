import config from '@config/index';
import { merge } from 'lodash';

import request from '@utils/request';

const urls = {
  ping: 'ping.json',
  user: 'user',
  jobs: 'jobs',
  company: 'company',
};

export const callAPI = async (endpoint, method, usePrimaryHost = false, header = {}, params = {}, data = {}) => {
  const defaultHeader = {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
  };

  const headers = merge(defaultHeader, header);
  const host = usePrimaryHost ? config.api.primaryHost : config.api.host;
  const options = {
    url: host + endpoint,
    method,
    headers,
    data,
    params,
  };

  return request(options).then((response) => {
    const responseAPI = response.data;
    return responseAPI;
  });
};

export const ping = () => callAPI(urls.ping, 'get');
export const loginApi = (data) =>
  callAPI(
    `${urls.user}/login`,
    'POST',
    true,
    {
      'Content-Type': 'application/json',
    },
    {},
    JSON.stringify(data)
  );
export const registerApi = (data) =>
  // console.log('Data for registration:', data);
  callAPI(
    // Pastikan mengembalikan hasil callAPI
    `${urls.user}/register`,
    'POST',
    true,
    {
      'Content-Type': 'application/json',
    },
    {},
    JSON.stringify(data)
  );

export const getAllJobs = () => callAPI(`${urls.jobs}`, 'GET', true);

export const getDetailJob = (id) => callAPI(`${urls.jobs}/${id}`, 'GET', true);

export const getAllJobsByUserId = () => callAPI(`${urls.jobs}/dashboards`, 'GET', true);

export const deleteJobApi = (jobId) => callAPI(`${urls.company}/deleteJob/${jobId}`, 'DELETE', true);

export const updateJobApi = (jobId, jobData) => callAPI(`${urls.company}/updateJob/${jobId}`, 'PUT', true, jobData);

export const fetchJobApi = (jobId) => callAPI(`${urls.company}/getJob/${jobId}`, 'GET', true);

export const applyForJobApi = (jobId, formData) =>
  callAPI(`${urls.jobs}/${jobId}/apply`, 'POST', true, {}, {}, formData);

export const checkUserApplicationApi = (jobId) => callAPI(`${urls.jobs}/${jobId}/check-application`, 'GET', true);

export const createJob = (job) =>
  callAPI(
    `${urls.company}/createJob`,
    'POST',
    true,
    {
      'Content-Type': 'application/json',
    },
    {},
    JSON.stringify(job)
  );

export const updateJob = (jobId, data) =>
  callAPI(
    `${urls.company}/updateJob/${jobId}`,
    'PUT',
    true,
    {
      'Content-Type': 'application/json',
    },
    {},
    JSON.stringify(data)
  );
