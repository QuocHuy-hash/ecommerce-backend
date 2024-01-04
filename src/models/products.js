'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Products.belongsTo(models.ProductsType, { foreignKey: 'product_type', as: 'productType' });
      Products.hasOne(models.Clothings, { foreignKey: 'product_id', as: 'clothing' });
      Products.hasOne(models.Electronic, { foreignKey: 'product_id', as: 'electronic' });
      Products.belongsTo(models.Shops, { foreignKey: 'product_shop', as: 'shop' });
    }
    async getProductDetails() {
      if (this.productType) {
        switch (this.productType.type_name) {
          case 'Clothing':
            this.clothingDetails = await this.getClothingDetails();
            break;
          case 'Electronic':
            this.electronicDetails = await this.getElectronicDetails();
            break;
          case 'Shoes':
            // this.electronicDetails = await this.getElectronicDetails();
            break;
          default:
            break;
        }
      }
    }

    async getClothingDetails() {
      return await this.getClothing();
    }

    async getElectronicDetails() {
      return await this.getElectronic();
    }
  }
  Products.init({
    product_name: DataTypes.STRING,
    product_thumb: DataTypes.STRING,
    product_description: DataTypes.TEXT,
    product_price: DataTypes.DECIMAL(10, 2),
    product_quantity: DataTypes.INTEGER,
    product_type: DataTypes.INTEGER,
    product_shop: DataTypes.INTEGER,
    product_start: DataTypes.INTEGER,

  }, {
    sequelize,
    modelName: 'Products',
  });
  return Products;
};