const jwt = require('jsonwebtoken');

function SetUser(user) {
    const secretKey = process.env.JWTSECRET;

    const token = jwt.sign(
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
