const express = require('express');
const router = express.Router();
const AccessController = require('../../controllers/access.controller');
const { asyncHandle } = require('../../auth/checkAuth');
const { authentication } = require('../../auth/authUtil');
//signUp 
router.post('/shop/signup', asyncHandle(AccessController.signUp));
router.post('/shop/login', asyncHandle(AccessController.login));

//authentication
router.use(authentication)
router.post('/shop/logout', asyncHandle(AccessController.logout));

module.exports = router;
