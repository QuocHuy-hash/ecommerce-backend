'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Shops', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING,
      },
      lastName: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
      },
      // Đối với MySQL, mảng chuỗi không được hỗ trợ trực tiếp, cần phải sử dụng kiểu dữ liệu khác hoặc chuỗi JSON.
      role: {
        type: Sequelize.JSON,
        defaultValue: '[]',
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: 'inactive',
      },
      verify: {
        type: Sequelize.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Shops');
  }
};
