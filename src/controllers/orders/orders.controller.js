// controllers/OrdersController.js

const { SuccessResponse, OkResponse } = require("../../core/success.response");
const { getListOrderShop, getListOrderUser, getDetailsOrder, cancelOrderByUser, updateOrderStatusByShop } = require("../../services/orders.service");
const HEADER = {
    CLIENT_ID: 'x-client-id',
};

class OrdersController {
    userId = null;
    setUserId(req) {
        this.userId = req.headers[HEADER.CLIENT_ID];
    }

    getListOrdersForShop = async (req, res, next) => {
        this.setUserId(req);
        new SuccessResponse({
            message: 'getListOrdersForShop successfully',
            metadata: await getListOrderShop(this.userId),
            options: {
                limit: 10,
            }
        }).send(res)
    }
    getListOrdersForUser = async (req, res, next) => {
        this.setUserId(req);
        new SuccessResponse({
            message: 'getListOrdersForUser successfully',
            metadata: await getListOrderUser(this.userId),
            options: {
                limit: 10,
            }
        }).send(res)
    }
    getDetailsOrder = async (req, res, next) => {
        new SuccessResponse({
            message: 'getDetailsOrder successfully',
            metadata: await getDetailsOrder(req.body.orderId),
            options: {
                limit: 10,
            }
        }).send(res)
    }
    cancelOrderByUser = async (req, res, next) => {
        this.setUserId(req);
        new SuccessResponse({
            message: 'cancelOrderByUser successfully',
            metadata: await cancelOrderByUser(this.userId, req.body),
            options: {
                limit: 10,
            }
        }).send(res)
    }
    updateOrderStatusByShop = async (req, res, next) => {
        this.setUserId(req);
        new SuccessResponse({
            message: 'update Order Status successfully',
            metadata: await updateOrderStatusByShop(this.userId, req.body),
            options: {
                limit: 10,
            }
        }).send(res)
    }
}
module.exports = new OrdersController();