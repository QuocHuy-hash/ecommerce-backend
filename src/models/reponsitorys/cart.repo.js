const { Cart, CartDetails } = require('../index');

const findCart = async (where) => {
    return await Cart.findOne(where);
}
const findCartDetails = async (where) => {
    return await CartDetails.findOne(where);
}

const findAllCartsUser = async ({
    limit = 10, page = 1, attributes, where, include
}) => {
    const skip = (page - 1) * limit;
    const response = await CartDetails.findAll(
        {
            ...where,
            skip: skip,
            limit: limit,
            attributes: attributes,
            include: include,
            nest: true,
            raw: true

        });
    return response;
}

module.exports = {
    findCart,
    findCartDetails,
    findAllCartsUser
}