'use strict';

const { BadRequestError } = require('../core/error.response');
const { Products, Electronic, ProductsType, Clothings, db } = require('../models');
const { sequelize } = require('../models/index');
const addProduct = require("../models/reponsitorys/product.repo");

class product {
    constructor({ id, product_name, product_thumb, product_description, product_price, product_shop, product_type, product_quantity, product_start, }) {
        this.id = id,
            this.product_name = product_name,
            this.product_thumb = product_thumb,
            this.product_description = product_description,
            this.product_price = product_price,
            this.product_shop = product_shop,
            this.product_type = product_type,
            this.product_quantity = product_quantity,
            this.product_start = product_start
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
    // async createProduct() {
    //     addProduct(this);
    // }
}

async function createProducts(productData, userId) {
    const transaction = await sequelize.transaction();
    let type_product = await ProductsType.findOne({
        where: { type_name: productData.product_type },
        transaction,
    });
    try {
        const productInstance = new product({ id: productData.id, ...productData, product_type: type_product.id, product_shop: userId });
        // create/update Product
        const newProduct = await productInstance.createProduct(transaction);
        //create/ update attribute
        const productId = newProduct[0].id;
        const attributeProduct = createAttributeProduct(productData, productId);
        await attributeProduct.createProduct(transaction);
        await transaction.commit();
        console.log('Sản phẩm đã được tạo hoặc cập nhật thành công!');
    } catch (error) {
        console.log('error!', error);
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



async function getShopProducts(userId) {
    const listProductShop = await Products.findAll({
        where: { product_shop: userId },
        attributes: ['id', 'product_name', 'product_thumb', 'product_description', 'product_price', 'product_quantity', 'product_start'],
        include: [
            { model: Clothings, as: "clothing", attributes: ["brand", "size", "color", "material"] },
            { model: Electronic, as: 'electronic', attributes: ["manufacturer", "model", "color"] },
            { model: ProductsType, as: 'productType', attributes: ["type_name"] },
        ],
        nest: true,
        raw: true,
    });
    console.log(listProductShop);
    return listProductShop;
}

async function getAllProducts() {
    const listProductShop = await Products.findAll({
        attributes: ['id', 'product_name', 'product_thumb', 'product_description', 'product_price', 'product_quantity', 'product_start'],
        include: [
            { model: ProductsType, as: 'productType', attributes: ["type_name"] },
        ],
        nest: true,
        raw: true,
    });
    console.log(listProductShop);
    return listProductShop;
}
async function deleteProduct(id, userId) {
    await Products.destroy({
        where: { id: id, product_shop: userId },
    });
}

module.exports = {
    // createProducts,
    // updateProduct,
    createProducts,
    getShopProducts,
    getAllProducts,
    deleteProduct

};
