'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Discounts', {
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
        type: Sequelize.INTEGER,
      },
      discount_use_count: {
        type: Sequelize.INTEGER,
      },
      discount_users_used: {
        type: Sequelize.JSON,
      },
      discount_max_uses_per_user: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      discount_min_order_value: {
        type: Sequelize.DECIMAL(10, 2), // Adjust precision and scale as needed
        allowNull: false,
      },
      discount_max_value: {
        type: Sequelize.DECIMAL(10, 2), // Adjust precision and scale as needed
        allowNull: false,
      },
      discount_is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      discount_applies_to: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isIn: [['all', 'specific']],
        },
      },
      discount_product_id: {
        type: Sequelize.JSON
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

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Discounts');
  },
};
