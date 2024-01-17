'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      product_name: {
        type: Sequelize.STRING
      },
      product_slug: {
        type: Sequelize.STRING
      },
      product_thumb: {
        type: Sequelize.STRING
      },
      product_description: {
        type: Sequelize.TEXT
      },
      product_price: {
        type: Sequelize.DECIMAL(10, 2)
      },
      product_quantity: {
        type: Sequelize.INTEGER
      },
      product_type: {
        type: Sequelize.INTEGER
      },
      product_shop: {
        type: Sequelize.INTEGER
      },

      product_start: {
        type: Sequelize.INTEGER
      },
      isDraft: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        index: true,
        select: false
      },
      isPublished: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        index: true,
        select: false
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
    await queryInterface.dropTable('Products');
  }
};