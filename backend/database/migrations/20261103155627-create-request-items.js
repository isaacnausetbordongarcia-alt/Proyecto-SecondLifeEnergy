"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("RequestItems", {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      requestId: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: { model: "requests", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      articleId: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: { model: "Articles", key: "id" },
        onDelete: "RESTRICT",
        onUpdate: "CASCADE",
      },
      quantity: { type: Sequelize.INTEGER.UNSIGNED, allowNull: false },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("RequestItems");
  },
};