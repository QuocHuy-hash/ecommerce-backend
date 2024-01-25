const express = require('express');
const router = express.Router();
const DiscountController = require('../../controllers/discount/discount.controller');
const { asyncHandle } = require('../../auth/checkAuth');
const { authentication } = require('../../auth/authUtil');

//authentication
router.post('/amount', asyncHandle(DiscountController.getDiscountAmount));
router.get('/list_product_code', asyncHandle(DiscountController.getAllDiscountWithProduct));

router.use(authentication) //require login
router.post('/create', asyncHandle(DiscountController.createDiscountCode));


module.exports = router;
