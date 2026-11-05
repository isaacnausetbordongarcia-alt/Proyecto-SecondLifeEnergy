'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    // Requiere users 1 (moderador), question 3 y answer 2
    await queryInterface.bulkInsert("moderations", [
      {
        id: 1,
        moderator_id: 1,
        question_id: 3,
        answer_id: null,
        action: "approve",
        reason: "Pregunta correcta y bien formulada",
        created_at: now,
      },
      {
        id: 2,
        moderator_id: 1,
        question_id: null,
        answer_id: 2,
        action: "edit",
        reason: "Se corrige el formato del texto",
        created_at: now,
      },
    ], {});

    // Synchronize PostgreSQL autoincrement
    if (queryInterface.sequelize.getDialect() === "postgres") {
      await queryInterface.sequelize.query(`
        SELECT setval(
          pg_get_serial_sequence('public.moderations', 'id'),
          COALESCE((SELECT MAX(id) FROM public.moderations), 0) + 1,
          false
        );
      `);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("moderations", { id: [1, 2] });
  },
};
