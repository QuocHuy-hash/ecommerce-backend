

const express = require('express');
const { permissions } = require('../auth/checkAuth');
const router = express.Router();


router.use('/v1/api/', require('./users/users'));
//discounts
router.use('/v1/api/discount', require('./discount/index'));
//carts and review orders
router.use('/v1/api/carts', require('./carts/index'));
//product
router.use('/v1/api/products', require('./products/index'));
//order
router.use('/v1/api/orders', require('./orders/index'));
// signUp
router.use('/v1/api/', require('./access/index'));

module.exports = router;