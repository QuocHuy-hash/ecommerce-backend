const { Products, Electronic, ProductsType, Clothings, db } = require('../index');
const { Op } = require('sequelize');
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
const findAllIsDraftShop = async (where, attributes, limit, skip) => {
    return await queryProduct(where, attributes, limit, skip)
}

const findAllIsPublishShop = async (where, attributes, limit, skip) => {
    return await queryProduct(where, attributes, limit, skip)
}
const publishProductByShop = async (product_shop, product_id) => {
    return publishProduct(product_shop, product_id)
}
const unPublishProductByShop = async (product_shop, product_id) => {
    return publishProduct(product_shop, product_id)
}
const searchProductByUser = async (searchKey) => {
    const keySearch = searchKey.keysearch
    const regexSearch = new RegExp(keySearch, 'i');
    return await Products.findAll({
        where: { isPublished: true },
        $text: { $search: regexSearch }
    }, { $score: { $meta: 'textScore' } });

}

const queryProduct = async (where, attributes, limit, skip) => {
    return await Products.findAll({
        ...where,
        attributes: attributes,
        order: [['updatedAt', 'DESC']],
        offset: skip,
        limit: limit,
        nest: true,
        raw: true
    });
}
const publishProduct = async (product_shop, product_id) => {
    const foundShop = await Products.findOne({ where: { product_shop: product_shop, id: product_id } });
    if (!foundShop) return null
    const [overwriteCount] = await Products.update(
        { isDraft: !foundShop.isDraft, isPublished: !foundShop.isPublished },
        { where: { product_shop: product_shop, id: product_id } }
    );
    return overwriteCount;
}
const getById = async (product_id) => {
    return await Products.findOne({ where: { id: product_id } });
}

module.exports = {
    deleteAttributes,
    publishProductByShop,
    findAllIsDraftShop,
    findAllIsPublishShop,
    unPublishProductByShop,
    searchProductByUser,
    getById

};
