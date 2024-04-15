const express = require('express');
const router = express.Router();
const { asyncHandle } = require('../../auth/checkAuth');
const { authentication } = require('../../auth/authUtil');
const usersController = require('../../controllers/users/users.controller');

//authenticationr
router.use(authentication) //require login
router.post('/follow-shop', asyncHandle(usersController.handleFollow));
router.get('/list-followers-shop', asyncHandle(usersController.getListFollowerForshop)); 
router.get('/list-shop-follow', asyncHandle(usersController.getListFollowerForUser)); 


module.exports = router;
