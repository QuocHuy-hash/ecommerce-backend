const express = require('express');
const router = express.Router();
const CategoryController = require('../../controllers/Category/category.controller');
const { asyncHandle } = require('../../auth/checkAuth');
const { authentication } = require('../../auth/authUtil');

router.use(authentication) //require login
router.post('/create', asyncHandle(CategoryController.createCategory));
router.get('/list-all', asyncHandle(CategoryController.getListCategory));
router.get('/one', asyncHandle(CategoryController.getCategory));
router.post('/delete', asyncHandle(CategoryController.deleteCategory));

module.exports = router;
