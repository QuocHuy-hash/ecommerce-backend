const { Order, OrdersDetails } = require('../models');

const findAllOrder = async ({
    limit = 50, page = 1, attributes, model, where
}) => {
    const skip = (page - 1) * limit;
    const response = await model.findAll(
        {
            ...where,
            skip: skip,
            limit: limit,
            attributes: attributes
        });
    return response;
}
const checkOrderExists = async ({ model, where }) => {
    return await model.findOne(where)
}
module.exports = {
    findAllOrder,
    checkOrderExists
}
