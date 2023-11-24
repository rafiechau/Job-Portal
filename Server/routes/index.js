const express = require('express');
const authRoute = require('./authRoute');
const companyRoute = require('./companyRoute');
const applicationRouter = require('./applicationRouter');

const router = express.Router();

router.use('/user', authRoute);
router.use('/company', companyRoute)
router.use('/jobs', applicationRouter)

module.exports = router;