const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
const User = require('../database/db');
const SetUser = require('../middlewares/auth')

// Login Page
const LoginPage = asyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = await SetUser(user);

        res.cookie('user_cookie', token, {
            domain: 'localhost',   
            httpOnly: true,
            maxAge: 60 * 1000 *5,
        });
        console.log(req.cookies.user_cookie);
        
        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                userId: user._id,
                email: user.email,
                fullName: user.fullName,
                role: user.role,
                imageUrl: user.imageUrl,
            },
        });
        // console.log(res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Signup Page
const SignupPage = asyncHandler(async (req, res) => {
    try {
        const { userId, email, password, fullName, gender, dateOfBirth, imageUrl } = req.body;

        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: "Email already in use" });
        }

        const existingUserId = await User.findOne({ userId });
        if (existingUserId) {
            return res.status(400).json({ message: "User ID already in use" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            userId,
            email,
            password: hashedPassword,
            fullName,
            gender,
            dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : undefined, 
            imageUrl,
            salt,
        });
        
        res.status(201).json({
            message: "Signup successful",
            user: {
                userId: newUser.userId,
                email: newUser.email,
                fullName: newUser.fullName,
                role: newUser.role,
                imageUrl: newUser.imageUrl,
            },
        });
        await newUser.save();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});



module.exports = {
    LoginPage,
    SignupPage,
};
