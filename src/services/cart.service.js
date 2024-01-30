const { Cart, Products, CartDetails, sequelize } = require('../models');
const { Op } = require('sequelize');

const { BadRequestError, NotFoundError } = require("../core/error.response");
const { getById } = require('../models/reponsitorys/product.repo');
const { findCart, findCartDetails } = require('../models/reponsitorys/cart.repo');

class CartInstance {
    constructor({ id, cart_state, cart_count_prod, cart_user_id, details }) {
        this.id = id;
        this.cart_state = cart_state;
        this.cart_count_prod = cart_count_prod;
        this.cart_user_id = cart_user_id;
        this.details = details;
    }

    async createCartAndDetails() {
        const transaction = await sequelize.transaction();
        const newCart = await Cart.upsert(this, { transaction });
        const cartId = newCart[0].id;
        if (this.details) {
            for (const detail of this.details) {
                detail.cart_id = cartId;
                await CartDetails.create(detail, { transaction });
            }
        }
        await transaction.commit();
        return newCart;

    }
}

const createCart = async (body, userId) => {
    const { product_id, quantity } = body;

    const product = await Products.findOne({ where: { id: product_id } });
    if (!product) throw new NotFoundError('not found product');
    const { product_price } = product;
    const where = { where: { cart_user_id: userId } }
    const foundCart = await findCart(where);
    const cartInstance = new CartInstance({
        id: foundCart ? foundCart.id : null,
        cart_user_id: userId,
        details: [{
            product_id,
            quantity,
            price: product_price,
            total: product_price * quantity,
        }],
    });

    await cartInstance.createCartAndDetails();
};
const addToCartV2 = async (body, userId) => {
    const { product_id, newQuantity } = body;

    const where = { where: { cart_user_id: userId } }
    const foundCart = await findCart(where);
    if (!foundCart) throw new NotFoundError('Cart user not exitst');

    const findDetails = { where: { cart_id: foundCart.id, product_id: product_id } }
    const foundCartDetails = await findCartDetails(findDetails);
    const { id, price } = foundCartDetails;
    const newTotal = newQuantity * price;

    if (newQuantity === 0) {
        await deleteCart(product_id, userId)
    }
    if (foundCartDetails) {
        await CartDetails.update({ ...CartDetails, quantity: newQuantity, total: newTotal }, { where: { id: id } });
        await Cart.update({ ...foundCart }, { where: { id: foundCart.id } })
    }

}
const deleteCart = async (product_id, userId) => {
    const where = { where: { cart_user_id: userId } }
    const foundCart = await findCart(where);
    if (!foundCart) throw new NotFoundError('not found cart user');
    const findDetails = { where: { cart_id: foundCart.id, product_id: product_id } }
    const foundCartDetails = await findCartDetails(findDetails);
    if (!foundCartDetails) throw new NotFoundError('not found cart details');

    await CartDetails.destroy({ where: { id: foundCartDetails.id } })

}

module.exports = {
    createCart,
    addToCartV2
};
