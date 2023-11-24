const express = require('express');

const authenticate = require('../middlewares/authenticate');
const upload = require('../utils/multer');
const {  getAllJobsByUserId, applyForJob, deleteApplication, getAllJobs, getDetailJob, checkUserApplication } = require('../controllers/applicationControllers');
const { authorizeJobRecruiter, authorizeJobTalent } = require('../middlewares/authorizeRole');

const router = express.Router();

router.get('/dashboards', authenticate, authorizeJobRecruiter, getAllJobsByUserId)
router.get('/', getAllJobs)
router.get('/:jobId', getDetailJob)
router.post('/:jobId/apply', authenticate, upload.single('cv'), applyForJob)
router.delete('/applications/:applicationId', authenticate, authorizeJobRecruiter, deleteApplication)
router.get('/:jobId/check-application', authenticate, authorizeJobTalent, checkUserApplication);



module.exports = router;