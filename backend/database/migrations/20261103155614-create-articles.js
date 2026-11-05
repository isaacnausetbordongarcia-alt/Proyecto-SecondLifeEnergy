"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Articles", {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      categoryId: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: { model: "article_categories", key: "id" },
        onDelete: "RESTRICT",
        onUpdate: "CASCADE",
      },
      createdById: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: { model: "users", key: "id" },
        onDelete: "RESTRICT",
        onUpdate: "CASCADE",
      },
      name: { type: Sequelize.STRING, allowNull: false },
      description: { type: Sequelize.TEXT, allowNull: true },
      type: { type: Sequelize.STRING, allowNull: false },
      specifications: { type: Sequelize.TEXT, allowNull: true },
      stock: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
      },
      status: { type: Sequelize.STRING, allowNull: false },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("Articles");
  },
};