const { Cart, Products, CartDetails, sequelize } = require('../models');

const { BadRequestError, NotFoundError } = require("../core/error.response");
const { findCart, findCartDetails } = require('../models/reponsitorys/cart.repo');
const { findAllIsPublishShop } = require('../models/reponsitorys/product.repo');
const { getDiscountAmount } = require('./discount.service');

const checkoutReviewOrder = async (body, userId) => {
    const { product_id, discount_code } = body;
    const order_ids_new = [];

    const where = { where: { cart_user_id: userId } }
    const foundCart = await findCart(where);
    if (!foundCart) throw new BadRequestError('cart does not exists');

    //loc quan id truyền vào và tim san pham trong gio hang
    for (let i = 0; i < product_id.length; i++) {
        const findDetails = {
            where: {
                cart_id: foundCart.id,
                product_id: product_id[i],
            }
        }
        const foundCartDetails = await findCartDetails(findDetails);
        if (!foundCartDetails) {
            throw new NotFoundError('not found cart details');
        }
        //lay gia chua add discount
        const checkoutPrice = foundCartDetails.total;

        const findProduct = { where: { id: product_id[i], isPublished: true } }
        const attribute = ['id', 'product_name', 'product_thumb', 'product_price', 'product_shop', 'product_quantity'];
        const product = await findAllIsPublishShop(findProduct, attribute);

        const products = [{
            quantity: foundCartDetails.quantity,
            price: foundCartDetails.price,
            name: product[0].product_name

        }];
        let discountInfo;
        if (discount_code) {
            const body = { code: discount_code, shopId: product[0].product_shop, products }
            discountInfo = await getDiscountAmount(body, userId);
        }

        try {
            console.log(" discountInfo:: ", discountInfo);

            const orderItem = {
                product: products[0].name,
                price: products[0].price,
                quantity: products[0].quantity,
                total: checkoutPrice,
                discount: discountInfo ? discountInfo.discount : 0,
                totalAfterDiscount: discountInfo ? checkoutPrice - discountInfo.discount : checkoutPrice
            };
            order_ids_new.push(orderItem);
        } catch (error) {
            console.log("error: :", error);
        }
    }
    const totalOrderPrice = order_ids_new.reduce((acc, item) => acc + item?.total, 0);
    const totalDiscount = order_ids_new.reduce((acc, item) => acc + item?.discount, 0);
    const totalCheckout = totalOrderPrice - totalDiscount;

    const orderSummary = {
        order_ids_new,
        totalOrderPrice,
        totalDiscount,
        totalCheckout
    };

    return orderSummary;

}

module.exports = {
    checkoutReviewOrder
}