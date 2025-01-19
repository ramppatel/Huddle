const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const {LoginPage,SignupPage} = require('../controllers/dashboard_api_controllers');

// Existing user login
router.post('/login',LoginPage);

// New User Signup
router.post('/signup',SignupPage);

router.get('/logout',(req,res)=>{
    res.clearCookie('userCookie');
    res.status(200).json({message:"Logout successful"});
  }   
)

module.exports = router;