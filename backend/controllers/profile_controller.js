const asyncHandler = require('express-async-handler')
const User = require('../model/user');

const GetProfile = asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    console.log(userId);    
    const user_details = await User.findOne({userId:userId});
    res.json(user_details);
});

module.exports = { GetProfile };