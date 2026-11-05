"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("roles", [
      { id: 1, name: "admin", description: "Acceso total a la plataforma" },
      { id: 2, name: "technician", description: "Gestiona artículos y stock" },
      { id: 3, name: "moderator", description: "Modera el foro" },
      { id: 4, name: "user", description: "Usuario registrado" },
    ]);

    // Ajustar el autoincremento en PostgreSQL
    if (queryInterface.sequelize.getDialect() === "postgres") {
      await queryInterface.sequelize.query(`
        SELECT setval(
          pg_get_serial_sequence('public.roles', 'id'),
          COALESCE((SELECT MAX(id) FROM public.roles), 0) + 1,
          false
        );
      `);
    }
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("roles", null, {});
  },
};