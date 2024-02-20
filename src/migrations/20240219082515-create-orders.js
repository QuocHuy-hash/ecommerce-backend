'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      order_userId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      order_shopId: {
        type: Sequelize.INTEGER,
      },
      order_total_price: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      order_total_discount: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      order_freeShip: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      order_ship_street: {
        type: Sequelize.STRING,
        allowNull: false
      },
      order_ship_wards: {
        type: Sequelize.STRING,
        allowNull: false
      },
      order_ship_district: {
        type: Sequelize.STRING,
        allowNull: false
      },
      order_ship_city: {
        type: Sequelize.STRING,
        allowNull: false
      },
      order_ship_country: {
        type: Sequelize.STRING,
        allowNull: false
      },
      order_payment: {
        type: Sequelize.STRING,
        defaultValue: 'afterReceiver',
      },
      order_tracking_number: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: 'pendding',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Orders');
  }
};