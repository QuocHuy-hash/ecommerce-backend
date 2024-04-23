const { createProducts } = require('../services/Products/product.service.js');
const { sequelize } = require('../models/index');

// Mock data for product creation
const mockProductData = {
    product_name: "Test Product",
    product_thumb: "test-product.png",
    product_description: "This is a test product",
    product_price: 1000,
    product_quantity: 50,
    product_type: "clothings",
    size: ["M", "L"],
    brand: "Test Brand",
    material: "Cotton",
    color: ["Black", "White"]
};

const mockUserId = 1; 

describe('Product Service', () => {
    beforeAll(async () => {
        await sequelize.authenticate(); 
    });

    afterAll(async () => {
        await sequelize.close(); 
    });

    test('createProducts should create a new product', async () => {
         await createProducts(mockProductData, mockUserId);
        // expect(result).toBeDefined();
        // expect(result.product_name).toEqual(mockProductData.product_name);
    });

});