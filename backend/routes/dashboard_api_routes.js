const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const {handleLogin, handleSignup} = require('../controllers/user');

// Existing user login
router.post('/login', handleLogin);

// New User Signup
router.post('/signup', handleSignup);

router.get('/logout',(req,res)=>{
    res.clearCookie('userCookie');
    res.status(200).json({message:"Logout successful"});
  }   
)

module.exports = router;