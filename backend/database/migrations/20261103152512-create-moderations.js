'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("moderations", {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      moderator_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: { model: "users", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      question_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: true,
        references: { model: "questions", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      answer_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: true,
        references: { model: "answers", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      action: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      reason: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      created_at: { type: Sequelize.DATE },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("moderations");
  },
};