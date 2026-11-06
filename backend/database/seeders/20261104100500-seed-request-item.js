"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    // Requests: 1 REQ-2026-0001, 2 REQ-2026-0002, 3 REQ-2026-0003
    await queryInterface.bulkInsert("request_items", [
      { id: 1, request_id: 1, article_id: 1, quantity: 2 },
      { id: 2, request_id: 1, article_id: 6, quantity: 2 },
      { id: 3, request_id: 2, article_id: 8, quantity: 1 },
      { id: 4, request_id: 2, article_id: 7, quantity: 1 },
      { id: 5, request_id: 3, article_id: 5, quantity: 4 },
      { id: 6, request_id: 3, article_id: 4, quantity: 1 },
      { id: 7, request_id: 3, article_id: 9, quantity: 1 },
    ]);

    // Ajustar el autoincremento en PostgreSQL
    if (queryInterface.sequelize.getDialect() === "postgres") {
      await queryInterface.sequelize.query(`
        SELECT setval(
          pg_get_serial_sequence('public.request_items', 'id'),
          COALESCE((SELECT MAX(id) FROM public.request_items), 0) + 1,
          false
        );
      `);
    }
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("request_items", null, {});
  },
};
