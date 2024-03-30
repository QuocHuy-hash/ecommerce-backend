const express = require('express');
const router = express.Router();
const ProductController = require('../../controllers/products/products.controller');
const { asyncHandle } = require('../../auth/checkAuth');
const { authentication } = require('../../auth/authUtil');

/**
 * @swagger
 * /v1/api/products/search/{keysearch}:
 *   get:
 *     summary: Search products by keyword
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: keysearch
 *         required: true
 *         schema:
 *           type: string
 *           default: ao
 *         description: Keyword to search for products
 *     responses:
 *       '200':
 *         description: OK
 *       '400':
 *         description: Bad request
 */
router.get('/search/:keysearch', asyncHandle(ProductController.ListSearchAllProducts));

/**
 * @swagger
 * /v1/api/products/list-all:
 *   get:
 *     summary: Get list of all products
 *     tags: [Products]
 *     responses:
 *       '200':
 *         description: OK
 *       '400':
 *         description: Bad request
 */
router.get('/list-all', asyncHandle(ProductController.ListAllProducts));

//authentication
router.use(authentication);

router.post('/create', asyncHandle(ProductController.createProduct));
router.post('/delete', asyncHandle(ProductController.delete));
router.get('/shop/draft-all', asyncHandle(ProductController.findAllIsDraftShop));
router.get('/shop/publish-all', asyncHandle(ProductController.findAllIsPublishShop));
router.get('/details', asyncHandle(ProductController.getDetailsProduct));
router.post('/shop/publish-product', asyncHandle(ProductController.publishProductShop));
router.post('/shop/unpublish-product', asyncHandle(ProductController.unPublishProductShop));
module.exports = router;
