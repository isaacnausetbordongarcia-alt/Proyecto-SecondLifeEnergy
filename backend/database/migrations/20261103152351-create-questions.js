'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("questions", {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      category_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: { model: "forum_categories", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      author_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: { model: "users", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      // La FK a "answers" se añade en una migración posterior
      // (answers todavía no existe y depende de questions).
      accepted_answer_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: true,
      },
      title: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      created_at: { type: Sequelize.DATE },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("questions");
  },
};