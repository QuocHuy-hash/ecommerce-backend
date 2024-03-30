const express = require('express');
const router = express.Router();
const CartController = require('../../controllers/carts/carts.controller');
const { asyncHandle } = require('../../auth/checkAuth');
const { authentication } = require('../../auth/authUtil');

//authentication

router.use(authentication) //require login


router.post('/create', asyncHandle(CartController.createCart));


router.post('/updateCart', asyncHandle(CartController.addToCartV2));


router.post('/delete-product-v1', asyncHandle(CartController.deleteCartProductV1));
router.post('/delete-product-v2', asyncHandle(CartController.deleteCartProductV2));
router.get('/list-cart-user', asyncHandle(CartController.getListCartsUser));


//checkout review order usser;
router.post('/review-order', asyncHandle(CartController.checkoutReviewOrder));
router.post('/orders', asyncHandle(CartController.orderByUser));


module.exports = router;
