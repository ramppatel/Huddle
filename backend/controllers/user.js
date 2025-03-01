const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
// const jwt = require('jsonwebtoken');
const User = require("../model/user");
const SetUser = require("../middlewares/auth");

// Login request
const handleLogin = asyncHandler(async (req, res) => {
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

    // console.log(res.cookie);

    // Send response without token in body when using cookies
    res.status(200).json({
      message: "Login successful",
      user: {
        token,
        userName: user.userName,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        imageUrl: user.imageUrl,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Signup request
const handleSignup = asyncHandler(async (req, res) => {
  try {
    const { fullName, userName, email, password } = req.body;

    // Normalize inputs to ensure uniqueness check works as expected
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedUserName = userName.trim().toLowerCase();

    const existingEmail = await User.findOne({ email: normalizedEmail });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const existingUserName = await User.findOne({
      userName: normalizedUserName,
    });
    if (existingUserName) {
      return res.status(400).json({ message: "Username already in use" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      userName: normalizedUserName,
      email: normalizedEmail,
      password: hashedPassword,
    });

    const result = await newUser.save();

    res.status(201).json({
      message: "Signup successful",
      user: {
        fullName: result.fullName,
        userName: result.userName,
        email: result.email,
      },
    });
  } catch (error) {
    console.error(error);

    // Handle duplicate key error explicitly
    if (error.code === 11000) {
      const duplicateField = Object.keys(error.keyPattern)[0];
      res.status(400).json({ message: `${duplicateField} already exists` });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
});


// Get user profile
const getUserProfile = asyncHandler(async (req, res) => {
  try {
    const userId = req.params.userId;
    // console.log(userId);
    const user = await User.findOne({ userName: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({
      message: "User found",
      user: {
        userName: user.userName,
        email: user.email,
        fullName: user.fullName,
        bio: user.bio,
        imageUrl: user.imageUrl,
        dateOfBirth: user.dateOfBirth,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Update user profile
const updateUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const { fullName, email, imageUrl, bio, dateOfBirth } = req.body;
    const user = await User.findOne({ userName: userId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (fullName) user.fullName = fullName;
    if (email) user.email = email;
    if (imageUrl) user.imageUrl = imageUrl;
    if (bio) user.bio = bio;
    if (dateOfBirth) user.dateOfBirth = dateOfBirth;

    await user.save();

    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        userId: user._id,
        fullName: user.fullName,
        email: user.email,
        imageUrl: user.imageUrl,
        bio: user.bio,
        dateOfBirth: user.dateOfBirth,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  handleLogin,
  handleSignup,
  getUserProfile,
  updateUserProfile,
};
