// controllers/productController.js

const { SuccessResponse } = require("../../core/success.response");
const { createProducts, getShopProducts, getAllProducts } = require("../../services/product.service");
const HEADER = {
    CLIENT_ID: 'x-client-id',
};

class ProductsController {
    userId = null;
    setUserId(req) {
        this.userId = req.headers[HEADER.CLIENT_ID];
    }

    createProduct = async (req, res, next) => {
        // const userId = req.headers[HEADER.CLIENT_ID];
        this.setUserId(req);
        const productData = req.body;
        new SuccessResponse({
            message: 'create OK',
            metadata: await createProducts(productData, this.userId),
            options: {
                limit: 10,
            }
        }).send(res)


    }
    ShopListProducts = async (req, res, next) => {
        this.setUserId(req);
        new SuccessResponse({
            message: 'get list  product shop OK',
            metadata: await getShopProducts(this.userId),
            options: {
                limit: 10,
            }
        }).send(res)
    }
    ListAllProducts = async (req, res, next) => {
        new SuccessResponse({
            message: 'get all product OK',
            metadata: await getAllProducts(),
            options: {
                limit: 10,
            }
        }).send(res)
    }
}
module.exports = new ProductsController();
