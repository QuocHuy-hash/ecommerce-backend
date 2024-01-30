'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Discount_Deletes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      discount_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      discount_shopId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      discount_description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      discount_type: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'fixed_amount',
      },
      discount_value: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      discount_max_value: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      discount_code: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      discount_start_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      discount_end_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      discount_max_uses: {
        type: Sequelize.JSON,
        defaultValue: null,
      },
      discount_use_count: {
        type: Sequelize.INTEGER,
        defaultValue: null,
      },
      discount_users_used: {
        type: Sequelize.INTEGER,
        defaultValue: null,
      },
      discount_max_uses_per_user: {
        type: Sequelize.INTEGER,
      },
      discount_min_order_value: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.00,
      },
      discount_is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      discount_product_id: {
        type: Sequelize.JSON,
        allowNull: false,

      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
