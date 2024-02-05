const { Discount, Discount_Delete } = require('../models');
const { Op } = require('sequelize');

const { BadRequestError, NotFoundError } = require("../core/error.response");
const { findAllIsPublishShop } = require('../models/reponsitorys/product.repo');
const { findAllDiscount, checkDiscountExists } = require('../models/reponsitorys/discount.repo');



/**
 * Discount service 
 * 1 - Generator Discount code [shop/admin]
 * 2 - Get discount amount [User]
 * 3 - Get all discount codes [User / Shop]
 * 4 - Verifi discount code [user]
 * 5 - Delete discount code [Admin / Shop]
 * 6 - Cancel discount Code [ user]
*/

const createDiscountCode = async (body, userId) => {
    const { code, start_date, end_date, is_active, min_order_value, discount_product_id, applies_to, users_used,
        name, description, type, value, max_value, max_uses, uses_count, max_uses_per_user
    } = body;
    const id = body.id ? body.id : null;
    const shopId = userId;
    console.log(body);

    if (new Date(end_date) > new Date(start_date)) throw new BadRequestError('start date must be before end_date');

    //create index for discount code 
    const foundDiscount = await Discount.findOne({
        where: {
            discount_code: code, discount_shopId: shopId
        }
    });
    if (foundDiscount && foundDiscount.discount_is_active) throw new BadRequestError('discount exists');
    const data = {
        discount_name: name,
        discount_shopId: shopId,
        discount_description: description,
        discount_type: type,
        discount_value: value,
        discount_code: code,
        discount_start_date: new Date(start_date),
        discount_end_date: new Date(end_date),
        discount_max_uses: max_uses,
        discount_use_count: uses_count,
        discount_users_used: users_used ? (users_used.length > 0 ? users_used : null) : [],
        discount_max_uses_per_user: max_uses_per_user,
        discount_min_order_value: min_order_value || 0,
        discount_max_value: max_value,
        discount_is_active: is_active,
        discount_applies_to: applies_to,
        discount_product_id: applies_to === 'all' ? [] : discount_product_id,
    }
    console.log("data :: ", id);
    if (id !== null) {
        await Discount.update(data, {
            where: {
                id: id
            }
        });
    } else {
        const newDiscount = await Discount.create(data);
        return newDiscount;
    }

}
const getAllDiscountWithProduct = async (body) => {
    const { code, shopId, limit, page } = body
    const foundDiscount = await Discount.findOne({
        where: {
            discount_code: code, discount_shopId: shopId
        }
    });

    if (!foundDiscount && !foundDiscount.discount_is_active) throw new NotFoundError('discount not exists');
    const { discount_applies_to, discount_product_id } = foundDiscount;
    let products;
    const skip = page - 1;
    if (discount_applies_to === 'all') {
        const where = { where: { product_shop: shopId, isPublished: true } }
        const attribute = ['id', 'product_name'];
        products = await findAllIsPublishShop(where, attribute, +limit, skip);
    }
    if (discount_applies_to === 'specific') {
        const productIds = discount_product_id.map(id => parseInt(id, 10));
        const where = { where: { id: { [Op.in]: productIds }, isPublished: true } }
        const attribute = ['id', 'product_name'];
        products = await findAllIsPublishShop(where, attribute, +limit, skip);

    }
    return products;
}

const getDiscountCodeByShop = async (shopId, limit = 10, page = 0) => {
    try {
        shopId = parseInt(shopId);
        const where = { where: { discount_shopId: shopId, discount_is_active: true } }
        const attributes = ["discount_name", "discount_description", "discount_type", "discount_value", "discount_code", "discount_start_date", "discount_end_date",
            "discount_max_uses", "discount_use_count", "discount_users_used", "discount_max_uses_per_user", "discount_min_order_value", "discount_max_value", "discount_is_active",
            "discount_applies_to", "discount_product_id"];

        const discounts = await findAllDiscount({
            where,
            limit: +limit,
            page: +page,
            model: Discount,
            attributes: attributes
        })
        return discounts;
    } catch (error) {
        console.log("errro ::", error);
    }


}

//get discount code amount after apply
const getDiscountAmount = async (body, userId) => {
    const { code, shopId, products } = body;
    console.log({ code, shopId, products });
    const where = { where: { discount_shopId: shopId, discount_code: code } }
    const foundDiscount = await checkDiscountExists({ model: Discount, where: where });
    if (!foundDiscount) {
        return {
            totalOrder: 0,
            discount: 0,
            totalPrice: 0
        }
    };

    const { discount_is_active, discount_max_uses, discount_value, discount_min_order_value, discount_max_uses_per_user, discount_applies_to
        , discount_users_used, discount_type } = foundDiscount;
    if (!discount_is_active) throw new NotFoundError('discount expried!');
    if (!discount_max_uses) throw new NotFoundError('discount are out!');

    let totalOrder = 0;
    // if(discount_applies_to == 'specific') {

    // }else {

    // }
    //check value require to use discount
    if (discount_min_order_value > 0) {
        totalOrder = products.reduce((acc, product) => {
            return acc + (product.quantity * product.price);
        }, 0)
        if (totalOrder < discount_min_order_value) throw new NotFoundError(`discount requires a minimum order value of ${discount_min_order_value}`)
    }
    //check users just use one
    if (discount_max_uses_per_user > 0) {
        const userDiscount = discount_users_used && discount_users_used.map(user => user.userId === userId);
        if (userDiscount) throw new NotFoundError('you are use this discount!')
    }
    //check discount is fixed_amount or specific and get values of the discount
    const amount = discount_type === 'fixed_amount' ? discount_value : totalOrder * (discount_value / 100);

    return {
        totalOrder,
        discount: amount,
        totalPrice: totalOrder - amount
    }

}
const deleteDiscountCode = async (body, shopId) => {
    const { code } = body;
    shopId = parseInt(shopId)
    const where = { where: { discount_shopId: shopId, discount_code: code } }
    const foundDiscount = await checkDiscountExists({ model: Discount, where: where });
    if (!foundDiscount) throw new NotFoundError('not found discount');
    const { discount_max_uses, discount_code } = foundDiscount;
    const validMaxUses = JSON.stringify(discount_max_uses);
    const data = foundDiscount.toJSON()
    await Discount_Delete.create({
        ...data,
        discount_max_uses: validMaxUses,
    });
    const deleteDiscount = await Discount.destroy({ where: { discount_code: discount_code } });
    return deleteDiscount;

}

// const cancelDiscountCode = async (shopId, code, userId) => {
//     const where = { where: { discount_shopId: shopId, discount_code: code } }
//     const foundDiscount = await checkDiscountExists({ model: Discount, where: where });
//     if (!foundDiscount) throw new NotFoundError('not not exitst');
//     const result = await Discount.update(
//         {
//             discount_users_used: Sequelize.fn('array_remove', Sequelize.col('discount_users_used'), userId),
//             discount_max_uses: Sequelize.literal('discount_max_uses + 1'),
//             discount_use_count: Sequelize.literal('discount_use_count - 1'),
//         },
//         {
//             where: { id: foundDiscount.id },
//         }
//     );
//     return result;
// }

module.exports = {
    createDiscountCode,
    getAllDiscountWithProduct,
    getDiscountCodeByShop,
    getDiscountAmount,
    deleteDiscountCode,
    // cancelDiscountCode
}
