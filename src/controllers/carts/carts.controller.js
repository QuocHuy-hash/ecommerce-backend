const { SuccessResponse } = require("../../core/success.response");
const { createCart, addToCartV2 } = require("../../services/cart.service");

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
}
module.exports = new CartController();