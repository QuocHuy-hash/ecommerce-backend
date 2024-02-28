'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Pushnotifications', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      noti_type: { type: Sequelize.STRING },
      noti_senderId: { type: Sequelize.INTEGER },
      noti_receivedId: { type: Sequelize.JSON, defaultValue: '[]', },
      noti_content: { type: Sequelize.STRING, allowNull: false },
      noti_product_name: { type: Sequelize.STRING },
      noti_shop_name: { type: Sequelize.STRING },
      status: { type: Sequelize.STRING, defaultValue: "" },
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
    await queryInterface.dropTable('Pushnotifications');
  }
};