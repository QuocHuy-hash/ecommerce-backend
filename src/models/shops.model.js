'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Shops extends Model {
    static associate(models) {
      Shops.hasMany(models.Products, { foreignKey: 'product_shop', as: 'products' });
      Shops.hasMany(models.Discount, { foreignKey: 'discount_shopId', as: 'discount' });
      Shops.hasMany(models.Discount_Delete, { foreignKey: 'discount_shopId', as: 'discount_delete' });

    }
  }

  Shops.init({
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    role: {
      type: DataTypes.ARRAY(DataTypes.STRING), // Mảng các chuỗi
      defaultValue: [],
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'inactive',
      validate: {
        isIn: [['inactive', 'active']], // Giới hạn giá trị chỉ được là 'inactive' hoặc 'active'
      },
    },
    verify: {
      type: DataTypes.BOOLEAN, // Kiểu dữ liệu boolean
    }
  }, {
    sequelize,
    modelName: 'Shops',
  });

  return Shops;
};
