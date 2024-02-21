
const express = require('express');
const router = express.Router();
const OrdersControllerconst = require('../../controllers/orders/orders.controller');
const { asyncHandle } = require('../../auth/checkAuth');
const { authentication } = require('../../auth/authUtil');

//authentication
router.use(authentication)
router.get('/list-shop', asyncHandle(OrdersControllerconst.getListOrdersForShop));
router.get('/list-user', asyncHandle(OrdersControllerconst.getListOrdersForUser));
//get details for users and shops
router.get('/details', asyncHandle(OrdersControllerconst.getDetailsOrder));
//cancel order by user
router.post('/cancel-order', asyncHandle(OrdersControllerconst.cancelOrderByUser));
//cancel order by user
router.post('/change-status', asyncHandle(OrdersControllerconst.updateOrderStatusByShop));
module.exports = router;