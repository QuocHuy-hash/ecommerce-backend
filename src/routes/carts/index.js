const express = require('express');
const router = express.Router();
const CartController = require('../../controllers/carts/carts.controller');
const { asyncHandle } = require('../../auth/checkAuth');
const { authentication } = require('../../auth/authUtil');

//authentication

router.use(authentication) //require login

/**
 * @swagger
 * /v1/api/carts/create:
 *   post:
 *     summary: Create a new cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: x-client-id
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *       - in: header
 *         name: athorization
 *         schema:
 *           type: string
 *         required: true
 *         description: JWT token for authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product_id:
 *                 type: integer
 *                 example: 1
 *               quantity:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         $ref: '#/components/responses/Success'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */
router.post('/create', asyncHandle(CartController.createCart));

/**
 * @swagger
 * /v1/api/carts/updateCart:
 *   post:
 *     summary: Add a product to the cart or update its quantity
 *     tags: [Cart Operations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/ClientIdHeader'
 *       - $ref: '#/components/parameters/AuthorizationHeader'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product_id:
 *                 type: integer
 *                 description: The ID of the product to add or update in the cart
 *                 example: 1
 *               newQuantity:
 *                 type: integer
 *                 description: The new quantity of the product in the cart. If set to 0, the product will be removed from the cart.
 *                 example: 3
 *     responses:
 *       200:
 *         $ref: '#/components/responses/Success'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */
router.post('/updateCart', asyncHandle(CartController.addToCartV2));

/**
 * @swagger
 * /v1/api/carts/delete-product-v1:
 *   post:
 *     summary: Delete a product from the cart
 *     tags: [Cart Operations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/ClientIdHeader'
 *       - $ref: '#/components/parameters/AuthorizationHeader'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product_id:
 *                 type: integer
 *                 description: The ID of the product to be deleted from the cart
 *                 example: 1
 *     responses:
 *       200:
 *         $ref: '#/components/responses/Success'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */
router.post('/delete-product-v1', asyncHandle(CartController.deleteCartProductV1));
router.post('/delete-product-v2', asyncHandle(CartController.deleteCartProductV2));
router.get('/list-cart-user', asyncHandle(CartController.getListCartsUser));
router.post('/delete-product-v2', asyncHandle(CartController.deleteCartProductV2));

//checkout review order usser;
router.post('/review-order', asyncHandle(CartController.checkoutReviewOrder));
router.post('/orders', asyncHandle(CartController.orderByUser));


module.exports = router;
