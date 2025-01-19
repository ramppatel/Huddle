const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { getUserProfile } = require("../controllers/profile_controller");
const { updateUserProfile } = require("../controllers/user");

router.get("/:userId", getUserProfile);
router.put("/:userId/editprofile", updateUserProfile);

module.exports = router;
