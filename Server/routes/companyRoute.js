const express = require('express');
const authenticate = require('../middlewares/authenticate');
const { authorizeJobRecruiter } = require('../middlewares/authorizeRole');
const {  postJob, updateJob, deleteJob } = require('../controllers/companyControllers');

const router = express.Router();


// router.post('/createProfile', authenticate, authorizeJobRecruiter, createCompanyProfile);
router.post('/createJob', authenticate, authorizeJobRecruiter, postJob);
router.put('/updateJob/:id', authenticate, authorizeJobRecruiter, updateJob);
router.delete('/deleteJob/:id', authenticate, authorizeJobRecruiter, deleteJob  )

module.exports = router;