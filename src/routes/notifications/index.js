
const express = require('express');
const router = express.Router();
const NotificationController = require('../../controllers/notifications/notification.controller');
const { asyncHandle } = require('../../auth/checkAuth');
const { authentication } = require('../../auth/authUtil');

//authentication
router.use(authentication)
router.get('/getByUser', asyncHandle(NotificationController.listNotiByUser));
router.get('/get-noti-by-shop', asyncHandle(NotificationController.getNotificationByShop));
router.post('/send-noti-by-shop', asyncHandle(NotificationController.sendNotiByShop));

module.exports = router;