import MainLayout from '@layouts/MainLayout';
import DashboardEditJob from '@pages/DashboardEditJob';

import DetailJobPage from '@pages/DetailJob';

import Home from '@pages/Home';
import DashboardJobsPage from '@pages/DashboardJobs';
import LoginPage from '@pages/Login';
import NotFound from '@pages/NotFound';
import RegisterPage from '@pages/Register';

const routes = [
  {
    path: '/',
    name: 'Home',
    protected: false,
    component: Home,
    layout: MainLayout,
  },
  {
    path: '/login',
    name: 'Login',
    protected: false,
    component: LoginPage,
  },
  {
    path: '/register',
    name: 'Register',
    protected: false,
    component: RegisterPage,
  },
  {
    path: '/job/:id',
    name: 'DetailJob',
    protected: false,
    component: DetailJobPage,
    layout: MainLayout,
  },
  {
    path: 'dashboard/jobs',
    name: 'Dashboard Jobs',
    protected: true,
    component: DashboardJobsPage,
    layout: MainLayout,
  },
  {
    path: 'dashboard/jobs/update/:id',
    name: 'Edit Jobs',
    protected: true,
    component: DashboardEditJob,
    layout: MainLayout,
  },
  {
    path: 'dashboard/createJob',
    name: 'Create Jobs',
    protected: true,
    component: DashboardEditJob,
    layout: MainLayout,
  },
  { path: '*', name: 'Not Found', component: NotFound, layout: MainLayout, protected: false },
];

export default routes;
