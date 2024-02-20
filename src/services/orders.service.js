const { Order, OrdersDetails } = require('../models');
const { BadRequestError, NotFoundError } = require("../core/error.response");
const { findCart, findCartDetails } = require('../models/reponsitorys/cart.repo');
const { checkOrderExists } = require('../models/reponsitorys/order.repo');

// const updateOrder = async (body, userId) => {
//     const { orderId, status } = body
// const where = {where : {product_id : }}
//     const foundOrder = checkOrderExists({OrdersDetails , })
// }

const getListOrderShop = async (userId) => {


}