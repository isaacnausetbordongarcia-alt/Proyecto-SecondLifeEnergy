"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    // Acelera las consultas de preguntas por categoría y de respuestas por pregunta
    await queryInterface.addIndex("questions", ["category_id"], { name: "questions_category_id" });
    await queryInterface.addIndex("answers", ["question_id"], { name: "answers_question_id" });
  },

  async down(queryInterface) {
    await queryInterface.removeIndex("questions", "questions_category_id");
    await queryInterface.removeIndex("answers", "answers_question_id");
  },
};