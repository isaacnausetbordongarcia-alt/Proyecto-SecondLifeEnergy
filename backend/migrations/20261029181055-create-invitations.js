'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('invitations', {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },

      invited_by_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },

      role_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },

      email: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },

      token_hash: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true,
      },

      expires_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      used_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },

      createdAt: Sequelize.DATE,
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('invitations');
  }
};
