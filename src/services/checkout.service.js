const { Order, OrdersDetails, Products, CartDetails } = require('../models');

const { BadRequestError, NotFoundError } = require("../core/error.response");
const { findCart, findCartDetails } = require('../models/reponsitorys/cart.repo');
const { findAllIsPublishShop } = require('../models/reponsitorys/product.repo');
const { getDiscountAmount } = require('./discount.service');
const { acquireLock, releaseLock } = require('./redis.service');
const { checkAvailableStock } = require('../models/reponsitorys/eventorys.repo');

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

const orderByUser = async (body, userId) => {
    const { product, totalPrice, totalDiscount, street, wards, district, city, country } = body
    // Kiểm tra số lượng sản phẩm có sẵn trong kho
    let availableStock = 0;
    for (let i = 0; i < product.length; i++) {
        const productId = product[i].product_id;
        availableStock = await checkAvailableStock(productId);
        if (availableStock < product[i].quantity) {
            throw new BadRequestError(`Not enough stock available for product with ID ${productId}`);
        }
    }

    // Khóa các sản phẩm trong kho để đảm bảo không ai đặt hàng cùng lúc
    const lockKeys = [];
    for (let i = 0; i < product.length; i++) {
        const productId = product[i].product_id;
        const lockKey = await acquireLock(productId, product[i].quantity);
        if (!lockKey) {
            // Release các lock đã được lấy trước đó
            await releaseLock(lockKeys);
            throw new BadRequestError(`Failed to acquire lock for product with ID ${productId}`);

        }
        lockKeys.push(lockKey);
    }

    // Thực hiện đặt hàng cho từng sản phẩm
    let orders = [];
    const newOrder = await Order.create({
        order_userId: userId,
        order_shopId: 0,
        order_total_price: totalPrice,
        order_total_discount: totalDiscount,
        order_freeShip: 0,
        order_ship_street: street,
        order_ship_wards: wards,
        order_ship_district: district,
        order_ship_city: city,
        order_ship_country: country,
        order_payment: 'afterReceiver',
        order_tracking_number: ''
    });
    orders.push(newOrder);
    for (let i = 0; i < product.length; i++) {
        const productId = product[i].product_id;
        orders = await OrdersDetails.create({
            order_id: newOrder.id,
            product_id: productId,
            quantity: product[i].quantity,
            price: product[i].price
        });
    }

    // Release các lock đã lấy sau khi đặt hàng hoàn tất
    await releaseLock(lockKeys);
    if (orders) {
        for (let i = 0; i < product.length; i++) {
            const productId = product[i].product_id;
            await Products.update({ product_quantity: availableStock - product[i].quantity }, { where: { id: productId } });
            await CartDetails.destroy({ where: { product_id: productId, cart_id: userId } });
        }

    }
    return orders;
    // const updatedEventory = await Inventory.update(
    //     { inven_stock: eventory.inven_stock - quantity },
    //     { where: { inven_product_id: productId } }
    // );
}
module.exports = {
    checkoutReviewOrder,
    orderByUser
} 