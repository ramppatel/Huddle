const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
// const jwt = require('jsonwebtoken');
const User = require("../model/user");
const SetUser = require("../middlewares/auth");

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

    // Using HTTP-only cookies
    res.cookie("userCookie", token, {
      path: "/",
      domain: "localhost",
      httpOnly: true,
      sameSite: "strict",
      maxAge: 1000 * 86400,
    });

    // Send response without token in body when using cookies
    res.status(200).json({
      message: "Login successful",
      user: {
        userId: user._id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        imageUrl: user.imageUrl,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Signup Page
const SignupPage = asyncHandler(async (req, res) => {
  try {
    const { fullName, userId, email, password } = req.body;

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const existingUserId = await User.findOne({ userId });
    if (existingUserId) {
      return res.status(400).json({ message: "Username already in use" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      userId,
      email,
      password: hashedPassword,
    });

    console.log(newUser);

    const result = await newUser.save();

    console.log(result);

    res.status(201).json({
      message: "Signup successful",
      user: {
        fullName: newUser.fullName,
        username: newUser.userId,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = {
  LoginPage,
  SignupPage,
};
