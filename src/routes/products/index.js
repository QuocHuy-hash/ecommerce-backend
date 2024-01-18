const express = require('express');
const router = express.Router();
const ProductController = require('../../controllers/products/products.controller');
const { asyncHandle } = require('../../auth/checkAuth');
const { authentication } = require('../../auth/authUtil');


router.get('/search/:keysearch', asyncHandle(ProductController.ListSearchAllProducts));
router.get('/list-all', asyncHandle(ProductController.ListAllProducts));

//authentication
router.use(authentication)

router.post('/create', asyncHandle(ProductController.createProduct));
router.post('/delete', asyncHandle(ProductController.delete));

//get isDraft Shop
router.get('/shop/draft-all', asyncHandle(ProductController.findAllIsDraftShop));
// get isPublished Shop
router.get('/shop/publish-all', asyncHandle(ProductController.findAllIsPublishShop));
//publish product shop 
router.post('/shop/publish-product', asyncHandle(ProductController.publishProductShop));
//unPublish product shop 
router.post('/shop/unpublish-product', asyncHandle(ProductController.unPublishProductShop));
module.exports = router;
