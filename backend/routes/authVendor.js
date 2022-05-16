const express = require("express");
const router = express.Router();

const {
  registerVendor,
  loginVendor,
  logoutVendor,
  forgotPassword,
  getVendorProfile,
  resetPassword,
  updateProfile,
  allVendors,
} = require("../controllers/vendorController");

const {
  isAuthenticatedVendor,
  authorizeRoles,
} = require("../middlewares/auth");

router.route("/registervendor").post(registerVendor);
router.route("/loginvendor").post(loginVendor);
router.route("/logoutvendor").get(logoutVendor);
router.route("/vendorpassword/forgot").post(forgotPassword);
router.route("/vendorpassword/reset/:token").put(resetPassword);

router.route("/admin/vendors").get(allVendors);
router.route("/vendor").get(isAuthenticatedVendor, getVendorProfile);
router.route("/vendor/update").put(isAuthenticatedVendor, updateProfile);

module.exports = router;
