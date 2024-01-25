

const express = require('express');
const { permissions } = require('../auth/checkAuth');
const router = express.Router();


// router.use(permissions('0000'));
router.use('/v1/api/', require('./users/users'));
//product
router.use('/v1/api/discount', require('./discount/index'));
//product
router.use('/v1/api/products', require('./products/index'));
// signUp
router.use('/v1/api/', require('./access/index'));

module.exports = router;