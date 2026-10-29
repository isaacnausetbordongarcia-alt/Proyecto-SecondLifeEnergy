'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('article_images', {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },

      article_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },

      url: {
        type: Sequelize.STRING(500),
        allowNull: false,
      },

      alt_text: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },

      sort_order: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('article_images');
  }
};
