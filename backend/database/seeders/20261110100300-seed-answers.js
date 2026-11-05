'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    // Requiere los questions 1 y 2 y users 1 y 3
    await queryInterface.bulkInsert("answers", [
      {
        id: 1,
        question_id: 1,
        author_id: 1,
        content: "Haz un ciclo completo de carga y descarga controlada y compara la capacidad medida con la nominal.",
        status: "published",
        created_at: now,
      },
      {
        id: 2,
        question_id: 1,
        author_id: 3,
        content: "Revisa también la resistencia interna y la dispersión de voltaje entre celdas.",
        status: "published",
        created_at: now,
      },
      {
        id: 3,
        question_id: 2,
        author_id: 1,
        content: "Comprueba que el rango de tensión del inversor cubra los 48 V nominales y la tensión máxima de carga.",
        status: "published",
        created_at: now,
      },
    ], {});

    // Synchronize PostgreSQL autoincrement
    if (queryInterface.sequelize.getDialect() === "postgres") {
      await queryInterface.sequelize.query(`
        SELECT setval(
          pg_get_serial_sequence('public.answers', 'id'),
          COALESCE((SELECT MAX(id) FROM public.answers), 0) + 1,
          false
        );
      `);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("answers", { id: [1, 2, 3] });
  },
};
