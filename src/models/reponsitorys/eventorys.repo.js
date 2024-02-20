const { BadRequestError } = require('../../core/error.response');
const { Inventory, } = require('../index');
const { Op } = require('sequelize');

const insertInventory = async (productId, shopId, stock,) => {
    const location = 'unknown'
    return await Inventory.create({
        inven_product_id: productId,
        inven_shopId: shopId,
        inven_stock: stock,
        inven_location: location
    })
};

const reservationInventory = async (productId, quantity) => {
    const eventory = await Inventory.findOne({ where: { inven_product_id: productId } });
    if (!eventory) {
        throw new BadRequestError('Inventory not found');
    }
    if (eventory.inven_stock < quantity) {
        throw new BadRequestError('Insufficient stock');
    }
    // Thực hiện cập nhật trực tiếp vào cột inven_stock
    const updatedEventory = await Inventory.update(
        { inven_stock: eventory.inven_stock - quantity },
        { where: { inven_product_id: productId } }
    );
    // Thực hiện cập nhật mảng inven_temporary_order
    // Sử dụng phương thức set để ghi đè mảng cũ
    await eventory.set('inven_temporary_order', quantity);
    await eventory.save(); // Lưu thay đổi

    return updatedEventory;
};
const checkAvailableStock = async (productId) => {
    const eventory = await Inventory.findOne({ where: { inven_product_id: productId } });
    return eventory ? eventory.inven_stock : 0;
}

module.exports = {
    insertInventory,
    reservationInventory,
    checkAvailableStock
}