'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Clothings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Clothings.init({
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    brand: DataTypes.STRING,
    size: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    material: DataTypes.STRING,
    color: {
      type: DataTypes.JSON,
      allowNull: true,
    },

  }, {
    sequelize,
    modelName: 'Clothings',
  });
  return Clothings;
};