const { Cart, CartDetails } = require('../index');

const findCart = async (where) => {
    return await Cart.findOne(where);
}
const findCartDetails = async (where) => {
    return await CartDetails.findOne(where);
}
module.exports = {
    findCart,
    findCartDetails
}