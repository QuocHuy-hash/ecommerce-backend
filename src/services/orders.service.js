const { BadRequestError, NotFoundError } = require('../core/error.response');
const { Order, OrdersDetails } = require('../models');
const { findAllOrder, findOneOrder } = require('../models/reponsitorys/order.repo');

const getListOrderShop = async (userId) => {
    const where = { where: { order_shopId: userId } }
    const getListOrdersShop = await findAllOrder({ model: Order, where })
    return getListOrdersShop;
}
const getListOrderUser = async (userId) => {
    const where = { where: { order_userId: userId } }
    const getListOrdersUser = await findAllOrder({ model: Order, where })
    return getListOrdersUser;

}
const getDetailsOrder = async (body) => {
    const { orderId } = body;
    const where = { where: { id: orderId } }
    const getDetailsOrder = await findOneOrder({ model: Order, where })
    return getDetailsOrder;

}

const cancelOrderByUser = async (userId, body) => {
    const { orderId } = body;
    console.log({ orderId, userId });
    const where = { where: { id: orderId, order_userId: userId } }
    const order = await findOneOrder({ model: Order, where });

    if (!order) throw new NotFoundError(`not found order with order Id ${orderId}`);

    if (order.status === 'pendding' || order.status === 'confirm') {
        return await Order.update({ status: 'canceled' }, { where: { id: orderId } })
    } else {
        throw new BadRequestError(`order with id ${orderId} was shipping`);
    }
}
// //for shop
const updateOrderStatusByShop = async (userId, body) => {

    const { orderId, status } = body;
    console.log({ orderId, status });
    const where = { where: { id: orderId, order_shopId: userId } }
    const order = await findOneOrder({ model: Order, where });

    if (!order) throw new NotFoundError(`not found order with order Id ${orderId}`);
    if (order.status === 'canceled') throw new BadRequestError('This orrder was canceled ')
    return await Order.update({ status: status }, { where: { id: orderId } })
}
module.exports = {
    getListOrderShop,
    getListOrderUser,
    getDetailsOrder,
    cancelOrderByUser,
    updateOrderStatusByShop
}