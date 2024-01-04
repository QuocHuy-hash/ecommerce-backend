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
      // define association here
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