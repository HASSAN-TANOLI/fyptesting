const express = require("express");

const router = express.Router();
const {
  getproducts,
  newProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  getAdminproducts,
  createProductReview,
  getProductReviews,
} = require("../controllers/productcontroller");
const {
  isAuthenticatedVendor,
  authorizeRoles,
  isAuthenticatedUser,
} = require("../middlewares/auth");

router.route("/products").get(getproducts);
router.route("/admin/products").get(getAdminproducts);

router.route("/product/:id").get(getSingleProduct);

router
  .route("/admin/product/new")
  .post(isAuthenticatedVendor, authorizeRoles("vendor"), newProduct);

router
  .route("/admin/product/:id")
  .put(isAuthenticatedVendor, authorizeRoles("vendor"), updateProduct);

router
  .route("/admin/product/:id")
  .delete(isAuthenticatedVendor, authorizeRoles("vendor"), deleteProduct);

  router.route('/review').put(isAuthenticatedUser, createProductReview);

  router.route('/reviews').get(isAuthenticatedUser, getProductReviews);

module.exports = router;
