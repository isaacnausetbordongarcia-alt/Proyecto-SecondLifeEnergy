'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    // Requiere articles 1 y 2, y users 1 y 2
    await queryInterface.bulkInsert("article_reviews", [
      {
        id: 1,
        article_id: 1,
        reviewer_id: 1,
        decision: "approved",
        comments: "Artículo claro y bien documentado",
        created_at: now,
      },
      {
        id: 2,
        article_id: 2,
        reviewer_id: 1,
        decision: "changes_requested",
        comments: "Faltan las especificaciones técnicas de capacidad",
        created_at: now,
      },
      {
        id: 3,
        article_id: 2,
        reviewer_id: 2,
        decision: "approved",
        comments: null,
        created_at: now,
      },
    ], {});

    // Synchronize PostgreSQL autoincrement
    if (queryInterface.sequelize.getDialect() === "postgres") {
      await queryInterface.sequelize.query(`
        SELECT setval(
          pg_get_serial_sequence('public.article_reviews', 'id'),
          COALESCE((SELECT MAX(id) FROM public.article_reviews), 0) + 1,
          false
        );
      `);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("article_reviews", { id: [1, 2, 3] });
  },
};
