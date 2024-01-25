const { SuccessResponse } = require("../../core/success.response");
const { createDiscountCode, getAllDiscountWithProduct, getDiscountCodeByShop, getDiscountAmount } = require("../../services/discount.service");
const HEADER = {
    CLIENT_ID: 'x-client-id',
};

class DiscountController {
    /**
     *  createDiscountCode,
    getAllDiscountWithProduct,
    getDiscountCodeByShop,
    getDiscountAmount,
    deleteDiscountCode,
    cancelDiscountCode
     */
    userId = null;
    setUserId(req) {
        this.userId = req.headers[HEADER.CLIENT_ID];
    }
    createDiscountCode = async (req, res, next) => {
        this.setUserId(req);
        new SuccessResponse({
            message: 'create Discount successfully',
            metadata: await createDiscountCode(req.body, this.userId)
        }).send(res)
    }
    getAllDiscountWithProduct = async (req, res, next) => {
        new SuccessResponse({
            message: 'getAllDiscountWithProduct successfully',
            metadata: await getAllDiscountWithProduct(req.body)
        }).send(res)
    }
    getDiscountAmount = async (req, res, next) => {
        new SuccessResponse({
            message: 'getAllDiscountWithProduct successfully',
            metadata: await getAllDiscountWithProduct(...req.body)
        }).send(res)
    }
    // getDiscountCodeByShop = async (req, res, next) => {
    //     new SuccessResponse = {
    //         message: 'getDiscountCodeByShop successfully',
    //         metadata: await getDiscountAmount(...req.body)
    //     }
    // }
}

module.exports = new DiscountController();