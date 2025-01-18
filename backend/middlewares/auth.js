const asyncHandler = require('express-async-handler');


const jwt = require('jsonwebtoken');

async function SetUser(user) {
    const secretKey = process.env.JWTSECRET;

    const token = await jwt.sign(
        {
            userId: user._id,
            email: user.email,
            role: user.role,
        },
        secretKey,
        { expiresIn: '1h' }
    );

    return token;
}

module.exports = SetUser;
