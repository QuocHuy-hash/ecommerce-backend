var express = require('express');
var router = express.Router();
const UserController = require('../../controllers/users/users.controller');
//signUp 
router.post('/users/create', UserController.createUser);
router.get('/users', function (req, res, next) {
  return res.send('hdhdhddhdh')
});

module.exports = router;
