const express = require('express');
const { registerUser, loginUser, getAllUsers } = require('../controllers/authControllers');
const authenticate = require('../middlewares/authenticate');
const { authorizeAdmin } = require('../middlewares/authorizeRole');

const router = express.Router();

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/', authenticate, authorizeAdmin, getAllUsers )

module.exports = router;