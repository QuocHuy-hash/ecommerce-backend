'use strict';

const { Products, Electronic, ProductsType, Clothings } = require('../models');
const { sequelize } = require('../models/index');

async function createProducts(productData, userId) {
    const transaction = await sequelize.transaction();
    // Tạo sản phẩm chung
    let type_product = await ProductsType.findOne({
        where: { type_name: productData.product_type },
        transaction,
    });

    const product = await Products.create({
        product_name: productData.product_name,
        product_thumb: productData.product_thumb,
        product_description: productData.product_description,
        product_price: productData.product_price,
        product_shop: userId,
        product_type: type_product.id,
        product_quantity: productData.product_quantity,
        product_start: productData.product_start,
    }, { transaction });



    // Kiểm tra loại sản phẩm và thêm thông tin chi tiết tương ứng
    switch (type_product.type_name) {
        case 'electronic':
            await Electronic.create(
                {
                    product_id: product.id,
                    manufacturer: productData.manufacturer,
                    model: productData.model,
                    color: productData.color,
                },
                { transaction }
            );
            break;
        case 'clothings':
            await Clothings.create(
                {
                    product_id: product.id,
                    brand: productData.brand,
                    size: productData.size,
                    material: productData.material,
                    color: productData.color,
                },
                { transaction }
            );
            break;
        // Add more cases for other product types if needed

        default:
            // Handle the default case or do nothing
            break;
    }
    // Kết thúc giao dịch
    await transaction.commit();

    console.log('Sản phẩm và thông tin chi tiết đã được thêm thành công!');

}

module.exports = {
    createProducts,
};
