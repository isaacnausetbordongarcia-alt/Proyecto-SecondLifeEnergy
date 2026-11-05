"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("permissions", [
      { id: 1, code: "users.manage", description: "Crear, editar y desactivar usuarios" },
      { id: 2, code: "articles.create", description: "Crear artículos" },
      { id: 3, code: "articles.review", description: "Revisar artículos" },
      { id: 4, code: "stock.manage", description: "Registrar movimientos de stock" },
      { id: 5, code: "resources.publish", description: "Publicar recursos" },
      { id: 6, code: "forum.moderate", description: "Moderar preguntas y respuestas" },
      { id: 7, code: "requests.manage", description: "Gestionar solicitudes" },
    ]);

    // Ajustar el autoincremento en PostgreSQL
    if (queryInterface.sequelize.getDialect() === "postgres") {
      await queryInterface.sequelize.query(`
        SELECT setval(
          pg_get_serial_sequence('public.permissions', 'id'),
          COALESCE((SELECT MAX(id) FROM public.permissions), 0) + 1,
          false
        );
      `);
    }
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("permissions", null, {});
  },
};