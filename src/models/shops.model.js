'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Shops extends Model {
    static associate(models) {
      // Định nghĩa mối quan hệ giữa các model ở đây nếu cần thiết

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
