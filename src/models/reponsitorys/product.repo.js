const { Products, Electronic, ProductsType, Clothings, db } = require('../index');

// const createProduct = async (data) => {
//     console.log({ data });
//     const where = { where: { product_id: productID } }
//     const existing = await ModelClass.findOne(where);
//     if (existing) {
//         return await ModelClass.update(data, where);
//     }
//     return await ModelClass.create(data);
// }


const deleteAttributes = async (product_type, productId) => {
    console.log({ product_type });
    const type = await ProductsType.findOne({ where: { id: product_type } });
    console.log({ product_type });

    switch (type.type_name) {
        case 'electronic':
            return await Electronic.destroy({ where: { product_id: productId } });
        case 'clothings':
            return await Clothings.destroy({ where: { product_id: productId } });
        default:
            throw new BadRequestError(`Invalid product type: ${type.type_name}`);
    }
}

module.exports = { deleteAttributes };
