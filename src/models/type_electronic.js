'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Electronic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Electronic.belongsTo(models.Products, { foreignKey: 'product_id', as: 'product' });
    }
  }
  Electronic.init({
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Products',
        key: 'id',
      },
    },
    manufacturer: {
      type: DataTypes.STRING,
      allowNull: false
    },
    model: {
      type: DataTypes.STRING,
    },
    color: {
      type: DataTypes.JSON,
    }
  }, {
    sequelize,
    modelName: 'Electronic',

  });
  return Electronic;
};