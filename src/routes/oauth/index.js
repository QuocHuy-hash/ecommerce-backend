

const express = require('express');
const router = express.Router();
const Oauth = require('../../controllers/oauth/oauth.controller');
const { asyncHandle } = require('../../auth/checkAuth');

//authentication
router.post('/facebook-login', Oauth.loginWithFacebook);
module.exports = router;