const asyncHandler = require('express-async-handler')
const User = require('../model/user');

const GetProfile = asyncHandler(async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findOne( { userId });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({
            message: "User found",
            user: {
                userId: user._id,
                email: user.email,
                fullName: user.fullName,
                role: user.role,
                imageUrl: user.imageUrl,
                gender: user.gender,
            },
        });
        
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = { GetProfile };