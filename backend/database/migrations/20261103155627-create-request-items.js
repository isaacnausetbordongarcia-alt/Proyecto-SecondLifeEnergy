"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("request_items", {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      request_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: { model: "requests", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      article_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: { model: "articles", key: "id" },
        onDelete: "RESTRICT",
        onUpdate: "CASCADE",
      },
      quantity: { type: Sequelize.INTEGER.UNSIGNED, allowNull: false },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("request_items");
  },
};