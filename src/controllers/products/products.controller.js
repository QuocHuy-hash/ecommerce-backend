// controllers/productController.js

const { SuccessResponse } = require("../../core/success.response");
const { createProducts } = require("../../services/product.service");
const HEADER = {
    CLIENT_ID: 'x-client-id',
};

class ProductsController {

    createProduct = async (req, res, next) => {
        const productData = req.body;
        const userId = req.headers[HEADER.CLIENT_ID];
        new SuccessResponse({
            message: 'create OK',
            metadata: await createProducts(productData, userId),
            options: {
                limit: 10,
            }
        }).send(res)


    }
}
module.exports = new ProductsController();
