const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const {handleLogin, handleSignup, getUserProfile, updateUserProfile } = require('../controllers/user');

// Existing user login
router.post('/login', handleLogin);

// New User Signup
router.post('/signup', handleSignup);

// User Logout
router.get('/logout',(req,res)=>{
    res.clearCookie('userCookie');
    res.status(200).json({message:"Logout successful"});
  }   
)

// Get user profile
router.get("/:userId", getUserProfile);

// Update user profile
router.put("/profile/:userId/editprofile", updateUserProfile);

module.exports = router;