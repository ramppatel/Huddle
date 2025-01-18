const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const {LoginPage,SignupPage} = require('../controllers/dashboard_api_controllers');

// Existing user login
router.post('/login',LoginPage);

// New User Signup
router.post('/signup',SignupPage);

module.exports = router;