

const express = require('express');

const router = express.Router();

// router.use('/v1/api/oauth', require('./oauth/index'))
//discounts
// signUp
router.use('/v1/api/', require('./access/index'));
router.use('/v1/api/products', require('./products/index'));
router.use('/v1/api/users', require('./users/index'));

router.use('/v1/api/discount', require('./discount/index'));
//carts and review orders
router.use('/v1/api/carts', require('./carts/index'));
//product
//product
router.use('/v1/api/upload', require('./upload/index'));
//order
router.use('/v1/api/orders', require('./orders/index'));
//order
router.use('/v1/api/comments', require('./comment/index'));

// notification
router.use('/v1/api/notifications', require('./notifications/index'));
router.use('/v1/api/category', require('./Category/index'));

module.exports = router;