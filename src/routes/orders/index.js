
const express = require('express');
const router = express.Router();
const OrdersController = require('../../controllers/orders/orders.controller');
const { asyncHandle } = require('../../auth/checkAuth');
const { authentication } = require('../../auth/authUtil');

//authentication
router.use(authentication)
router.get('/list-shop', asyncHandle(OrdersController.getListOrdersForShop));
router.get('/list-user', asyncHandle(OrdersController.getListOrdersForUser));
//get details for users and shops
router.get('/details', asyncHandle(OrdersController.getDetailsOrder));
//cancel order by user
router.post('/cancel-order', asyncHandle(OrdersController.cancelOrderByUser));
//cancel order by user
router.post('/change-status', asyncHandle(OrdersController.updateOrderStatusByShop));
module.exports = router;