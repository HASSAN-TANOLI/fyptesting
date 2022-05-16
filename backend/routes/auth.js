const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  updatePassword,
  updateProfile,
  getUserProfile,
} = require("../controllers/customerController");

const { isAuthenticatedUser } = require("../middlewares/auth");

router.route("/registeruser").post(registerUser);
router.route("/loginuser").post(loginUser);
router.route("/logoutuser").get(logoutUser);
router.route("/userpassword/forgot").post(forgotPassword);
router.route("/userpassword/reset/:token").put(resetPassword);

router.route("/user").get(isAuthenticatedUser, getUserProfile);
router.route("/password/update").put(isAuthenticatedUser, updatePassword);
router.route("/user/update").put(isAuthenticatedUser, updateProfile);

module.exports = router;
