
const express = require('express');
const router = express.Router();
const NotificationController = require('../../controllers/notifications/notification.controller');
const { asyncHandle } = require('../../auth/checkAuth');
const { authentication } = require('../../auth/authUtil');

//authentication
router.use(authentication)
router.get('/getByUser', asyncHandle(NotificationController.listNotiByUser));

module.exports = router;