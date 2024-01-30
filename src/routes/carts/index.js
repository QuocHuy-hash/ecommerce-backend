const express = require('express');
const router = express.Router();
const CartController = require('../../controllers/carts/carts.controller');
const { asyncHandle } = require('../../auth/checkAuth');
const { authentication } = require('../../auth/authUtil');

//authentication

router.use(authentication) //require login
router.post('/create', asyncHandle(CartController.createCart));
router.post('/updateCart', asyncHandle(CartController.addToCartV2));


module.exports = router;
