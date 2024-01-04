'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductsType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ProductsType.hasMany(models.Products, { foreignKey: 'product_type', as: 'products' });
    }
  }
  ProductsType.init({
    type_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ProductsType',
  });
  return ProductsType;
};