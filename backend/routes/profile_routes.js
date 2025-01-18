const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { GetProfile } = require('../controllers/profile_controller');


router.get('/:user_id', GetProfile);

module.exports = router;