

const express = require('express');
const { apiKey, permissions } = require('../auth/checkAuth');
const router = express.Router();

//check APi :{router.use(apiKey);}

// check permission : {router.use(permissions('0000'));}

router.use('/v1/api/', require('./users/users'));
// signUp
router.use('/v1/api/', require('./access/index'));
//product
router.use('/v1/api/', require('./products/index'));

module.exports = router;