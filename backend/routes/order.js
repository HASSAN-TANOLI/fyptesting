const express = require('express')
const router = express.Router();

const {
    newOrder,
    getSingleOrder,
    myOrders,
    allOrders,
    updateOrder,
    deleteOrder

} = require('../controllers/orderController')

const { isAuthenticatedUser, isAuthenticatedVendor, authorizeRoles } = require('../middlewares/auth')

router.route('/order/new').post(isAuthenticatedUser, newOrder);

router.route('/order/:id').get(isAuthenticatedUser, getSingleOrder);
router.route('/orders/user').get(isAuthenticatedUser, myOrders);

router.route('/admin/orders/').get(isAuthenticatedVendor, authorizeRoles('vendor'), allOrders);
router.route('/admin/order/:id')
    .put(isAuthenticatedVendor, authorizeRoles('vendor'), updateOrder)
    .delete(isAuthenticatedVendor, authorizeRoles('vendor'), deleteOrder);

module.exports = router;