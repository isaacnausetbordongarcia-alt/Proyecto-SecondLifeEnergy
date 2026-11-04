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
        references: { model: 'articles', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
      },
    });

    await queryInterface.addIndex('article_images', ['article_id', 'sort_order']);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('article_images');
  },
};