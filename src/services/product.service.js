'use strict';

const { BadRequestError } = require('../core/error.response');
const { Products, Electronic, ProductsType, Clothings, db } = require('../models');
const { sequelize } = require('../models/index');
const productReponsitory = require("../models/reponsitorys/product.repo");

class product {
    constructor({ id, product_name, product_slug, product_thumb, product_description, product_price, product_shop, product_type, product_quantity,
        product_start, isDraft, isPublished }) {
        this.id = id,
            this.product_slug = product_slug,
            this.product_name = product_name,
            this.product_thumb = product_thumb,
            this.product_description = product_description,
            this.product_price = product_price,
            this.product_shop = product_shop,
            this.product_type = product_type,
            this.product_quantity = product_quantity,
            this.product_start = product_start,
            this.isDraft = isDraft,
            this.isPublished = isPublished
    }
    async createProduct() {
        return await Products.upsert(this)
    }

}
class electronic extends Products {
    constructor({ product_id, manufacturer, model, color }) {
        super();
        this.product_id = product_id;
        this.manufacturer = manufacturer;
        this.model = model;
        this.color = color;
    }
    async createProduct() {
        const where = { where: { product_id: this.product_id } };
        const existing = await Electronic.findOne(where);
        if (existing) {
            return await Electronic.update(this, where);
        }
        return await Electronic.create(this);
    }
}
class clothings extends Products {
    constructor({ product_id, brand, size, material, color }) {
        super();
        this.product_id = product_id;
        this.brand = brand;
        this.size = size;
        this.material = material;
        this.color = color;
    }
    async createProduct() {
        const where = { where: { product_id: this.product_id } }
        const existing = await Clothings.findOne(where);
        if (existing) {
            return await Clothings.update(this, where);
        }
        return await Clothings.create(this);
    }
}

async function createProducts(productData, userId) {
    const transaction = await sequelize.transaction();
    let type_product = await ProductsType.findOne({
        where: { type_name: productData.product_type },
        transaction,
    });

    try {
        const productInstance = new product({ id: productData.id, ...productData, product_type: type_product.id, product_shop: userId });
        const newProduct = await productInstance.createProduct(transaction);
        const productId = newProduct[0].id;
        const attributeProduct = createAttributeProduct(productData, productId);
        await attributeProduct.createProduct(transaction);
        await transaction.commit();
        console.log('Sản phẩm đã được tạo hoặc cập nhật thành công!');
    } catch (error) {
        console.log("Lỗi", error);
    }
}

const createAttributeProduct = (productData, id) => {
    switch (productData.product_type) {
        case 'electronic':
            return new electronic({ ...productData, product_id: id });
        case 'clothings':
            return new clothings({ ...productData, product_id: id });
        default:
            throw new BadRequestError(`Invalid product type :`, productData.product_type);
    }
}

async function findAllIsDraftShop(product_shop, limit = 50, skip = 0) {
    const where = { where: { product_shop: product_shop, isDraft: true } }
    const attribute = ['id', 'product_name', 'product_thumb', 'product_description', 'product_price', 'product_quantity', 'product_start'];
    return await productReponsitory.findAllIsDraftShop(where, attribute, limit, skip);

}
async function findAllIsPublishShop(product_shop, limit = 50, skip = 0) {
    const where = { where: { product_shop: product_shop, isPublished: true } }
    const attribute = ['id', 'product_name', 'product_thumb', 'product_description', 'product_price', 'product_quantity', 'product_start'];
    return await productReponsitory.findAllIsPublishShop(where, attribute, limit, skip);

}

async function getAllProducts() {
    const listProduct = await Products.findAll({
        where: { isPublished: true },
        attributes: ['id', 'product_name', 'product_thumb', 'product_description', 'product_price', 'product_quantity', 'product_start'],
        include: [
            { model: ProductsType, as: 'productType', attributes: ["type_name"] },
        ],
        nest: true,
        raw: true,
    }).sort({ updateAt: -1 });

    return listProduct;
}
async function deleteProduct(id, userId) {
    const productItem = await Products.findOne({ where: { id: id.id } });
    productReponsitory.deleteAttributes(productItem.product_type, id.id);
    await Products.destroy({
        where: { id: id.id, product_shop: userId },
    });
}
// publishProductByShop
async function publishProductByShop(product_shop, product_id) {
    return productReponsitory.publishProductByShop(product_shop, product_id);
}
// unPublishProductByShop
async function unPublishProductByShop(product_shop, product_id) {
    return productReponsitory.unPublishProductByShop(product_shop, product_id);
}
// /searchProductByUser
async function searchProductByUser(keySearch) {
    return productReponsitory.searchProductByUser(keySearch);
}

module.exports = {
    createProducts,
    getAllProducts,
    deleteProduct,
    publishProductByShop,
    findAllIsDraftShop,
    findAllIsPublishShop,
    unPublishProductByShop,
    searchProductByUser

};