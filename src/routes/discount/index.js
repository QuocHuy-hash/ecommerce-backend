const express = require('express');
const router = express.Router();
const DiscountController = require('../../controllers/discount/discount.controller');
const { asyncHandle } = require('../../auth/checkAuth');
const { authentication } = require('../../auth/authUtil');

//authentication
router.get('/list_product_code', asyncHandle(DiscountController.getAllDiscountWithProduct));

router.use(authentication) //require login
router.post('/amount', asyncHandle(DiscountController.getDiscountAmount));
router.post('/create', asyncHandle(DiscountController.createDiscountCode));
router.get('/list_shop_code', asyncHandle(DiscountController.getDiscountCodeByShop));
router.post('/delete', asyncHandle(DiscountController.deleteDiscount));


module.exports = router;
