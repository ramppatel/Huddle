const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { getUserProfile } = require('../controllers/profile_controller');


router.get('/:userId', getUserProfile);


module.exports = router;