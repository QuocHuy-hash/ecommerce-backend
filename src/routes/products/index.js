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

/**
 * @swagger
 * /v1/api/products/create:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     security:
 *       - athorization: []
 *       - x-client-id:[] 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product_name:
 *                 type: string
 *                 default: Giay Da bong ToniKroos
 *               product_thumb:
 *                 type: string
 *                 default: Giay Da bong ToniKroos.png
 *               product_description:
 *                 type: string
 *                 default: Giay Da bong ToniKroos- bền bỉ , thoải mãi . ôm chân
 *               product_price:
 *                 type: number
 *                 default: 600000
 *               product_quantity:
 *                 type: integer
 *                 default: 100
 *               product_type:
 *                 type: string
 *                 default: clothings
 *               size:
 *                 type: array
 *                 items:
 *                   type: string
 *                 default: ["32", "31", "22"]
 *               brand:
 *                 type: string
 *                 default: Jeans
 *               material:
 *                 type: string
 *                 default: đây là model của máy Quần jean ống xuông 222
 *               color:
 *                 type: array
 *                 items:
 *                   type: string
 *                 default: ["Đen", "Trắng", "RED"]
 *               isDraft:
 *                 type: boolean
 *                 default: true
 *               isPublished:
 *                 type: boolean
 *                 default: false
 *     responses:
 *       '200':
 *         description: OK
 *       '400':
 *         description: Bad request
 */
router.post('/create', asyncHandle(ProductController.createProduct));

/**
 * @swagger
 * /v1/api/products/delete:
 *   post:
 *     summary: Delete a product
 *     tags: [Products]
 *     security:
 *       - athorization: []
 *       - x-client-id:[] 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: integer
 *     responses:
 *       '200':
 *         description: OK
 *       '400':
 *         description: Bad request
 */
router.post('/delete', asyncHandle(ProductController.delete));

/**
 * @swagger
 * /v1/api/products/shop/draft-all:
 *   get:
 *     summary: Get list of all draft products of a shop
 *     tags: [Products]
 *     security:
 *       - athorization: []
 *       - x-client-id:[] 
 *     responses:
 *       '200':
 *         description: OK
 *       '400':
 *         description: Bad request
 */
router.get('/shop/draft-all', asyncHandle(ProductController.findAllIsDraftShop));

/**
 * @swagger
 * /v1/api/products/shop/publish-all:
 *   get:
 *     summary: Get list of all published products of a shop
 *     tags: [Products]
 *     security:
 *       - athorization: []
 *       - x-client-id:[] 
 *     responses:
 *       '200':
 *         description: OK
 *       '400':
 *         description: Bad request
 */
router.get('/shop/publish-all', asyncHandle(ProductController.findAllIsPublishShop));

/**
 * @swagger
 * /v1/api/products/details:
 *   get:
 *     summary: Get details of a product
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: productId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the product to get details
 *     responses:
 *       '200':
 *         description: OK
 *       '400':
 *         description: Bad request
 */
router.get('/details', asyncHandle(ProductController.getDetailsProduct));

/**
 * @swagger
 * /v1/api/products/shop/publish-product:
 *   post:
 *     summary: Publish a product of a shop
 *     tags: [Products]
 *     security:
 *       - athorization: []
 *       - x-client-id:[2] 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: integer
 *                 default: 2
 *     responses:
 *       '200':
 *         description: OK
 *       '400':
 *         description: Bad request
 */
router.post('/shop/publish-product', asyncHandle(ProductController.publishProductShop));

/**
 * @swagger
 * /v1/api/products/shop/unpublish-product:
 *   post:
 *     summary: Unpublish a product of a shop
 *     tags: [Products]
 *     security:
 *       - athorization: []
 *       - x-client-id:[] 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: integer
 *     responses:
 *       '200':
 *         description: OK
 *       '400':
 *         description: Bad request
 */
router.post('/shop/unpublish-product', asyncHandle(ProductController.unPublishProductShop));
module.exports = router;
