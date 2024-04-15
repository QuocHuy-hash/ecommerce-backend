// controllers/productController.js

const { SuccessResponse, OkResponse } = require("../../core/success.response");
const { createProducts, getAllProducts, deleteProduct, findAllIsDraftShop, findAllIsPublishShop,
    publishProductByShop, unPublishProductByShop, searchProductByUser, getDetailsProduct } = require("../../services/Products/product.service");
const HEADER = {
    CLIENT_ID: 'x-client-id',
};

class ProductsController {
    userId = null;
    setUserId(req) {
        this.userId = req.headers[HEADER.CLIENT_ID];
    }

    createProduct = async (req, res, next) => {
        this.setUserId(req);
        const productData = req.body;
        new SuccessResponse({
            message: 'create orr update successfully',
            metadata: await createProducts(productData, this.userId),
            options: {
                limit: 10,
            }
        }).send(res)
    }

    findAllIsDraftShop = async (req, res, next) => {
        this.setUserId(req);
        new SuccessResponse({
            message: 'findAllIsDraftShop True',
            metadata: await findAllIsDraftShop(this.userId),

        }).send(res)
    }
    findAllIsPublishShop = async (req, res, next) => {
        this.setUserId(req);
        new SuccessResponse({
            message: 'findAllIsDraftShop True',
            metadata: await findAllIsPublishShop(this.userId),

        }).send(res)
    }
    publishProductShop = async (req, res, next) => {
        this.setUserId(req);
        const product_id = req.body.id;
        new SuccessResponse({
            message: 'Publish product shop successfully',
            metadata: await publishProductByShop(this.userId, product_id),

        }).send(res)
    }
    unPublishProductShop = async (req, res, next) => {
        this.setUserId(req);
        const product_id = req.body.id;
        new SuccessResponse({
            message: 'UnPublish product shop successfully',
            metadata: await unPublishProductByShop(this.userId, product_id),

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
    getDetailsProduct = async (req, res, next) => {
        const product_id = req.body.id;
        new SuccessResponse({
            message: 'get detail product OK',
            metadata: await getDetailsProduct(product_id),
        }).send(res)
    }
    ListSearchAllProducts = async (req, res, next) => {
        new SuccessResponse({
            message: 'ListSearchAllProducts OK',
            metadata: await searchProductByUser(req.params),
        }).send(res)
    }
    delete = async (req, res, next) => {
        this.setUserId(req);
        const id = req.body;
        new SuccessResponse({
            message: 'delete product OK',
            metadata: await deleteProduct(id, this.userId),
        }).send(res)
    }
}
module.exports = new ProductsController();
