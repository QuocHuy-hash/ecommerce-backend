const { SuccessResponse } = require("../../core/success.response");
const { createCart, addToCartV2, deleteCartProductV1, deleteCartProductV2, getListCartsUser } = require("../../services/cart.service");
const { checkoutReviewOrder } = require("../../services/checkout.service");

const HEADER = {
    CLIENT_ID: 'x-client-id',
};
class CartController {

    userId = null;
    setUserId(req) {
        this.userId = req.headers[HEADER.CLIENT_ID];
    }
    createCart = async (req, res, next) => {
        this.setUserId(req);
        new SuccessResponse({
            message: 'create cart successfully',
            metadata: await createCart(req.body, this.userId)
        }).send(res)
    }
    addToCartV2 = async (req, res, next) => {
        this.setUserId(req);
        new SuccessResponse({
            message: 'update cart successfully',
            metadata: await addToCartV2(req.body, this.userId)
        }).send(res)
    }
    deleteCartProductV1 = async (req, res, next) => {
        this.setUserId(req);
        const product_id = req.body.product_id;
        new SuccessResponse({
            message: 'deleteCartProduct successfully',
            metadata: await deleteCartProductV1(product_id, this.userId)
        }).send(res)
    }
    deleteCartProductV2 = async (req, res, next) => {
        this.setUserId(req);

        new SuccessResponse({
            message: 'deleteCartProduct successfully',
            metadata: await deleteCartProductV2(req.body, this.userId)
        }).send(res)
    }
    getListCartsUser = async (req, res, next) => {
        this.setUserId(req);

        new SuccessResponse({
            message: 'getListCartsUser successfully',
            metadata: await getListCartsUser(this.userId)
        }).send(res)
    }
    checkoutReviewOrder = async (req, res, next) => {
        this.setUserId(req);

        new SuccessResponse({
            message: 'review ordering',
            metadata: await checkoutReviewOrder(req.body, this.userId)
        }).send(res)
    }
}
module.exports = new CartController();