const asyncHandler = require('express-async-handler')
const User = require('../database/db');

const GetProfile = asyncHandler(async (req, res) => {
    const User_id = req.query.User_id;
    const user_details = await User.findOne({ where: { User_id: User_id } });
    res.json(user_details);
});

module.exports = { GetProfile };