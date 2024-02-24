'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Comments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      comment_productId: { type: Sequelize.STRING },
      comment_userId: { type: Sequelize.STRING },
      comment_content: { type: Sequelize.STRING },
      comment_left: { type: Sequelize.DECIMAL },
      comment_right: { type: Sequelize.DECIMAL },
      comment_parentId: { type: Sequelize.DECIMAL },
      isDelete: { type: Sequelize.BOOLEAN },
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
    await queryInterface.dropTable('Comments');
  }
};