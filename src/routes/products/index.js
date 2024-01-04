const express = require('express');
const router = express.Router();
const ProductController = require('../../controllers/products/products.controller');
const { asyncHandle } = require('../../auth/checkAuth');
const { authentication } = require('../../auth/authUtil');

//authentication
router.use(authentication)
router.post('/products/create', asyncHandle(ProductController.createProduct));



module.exports = router;
