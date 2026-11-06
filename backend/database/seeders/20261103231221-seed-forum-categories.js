"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("forum_categories", [
      { id: 1, name: "General", description: "Temas generales sobre el proyecto" },
      { id: 2, name: "Baterías", description: "Dudas sobre baterías de segunda vida" },
      { id: 3, name: "Instalaciones solares", description: "Montaje y configuración de paneles" },
      { id: 4, name: "Seguridad", description: "Buenas prácticas y riesgos eléctricos" },
    ]);

    // Ajustar el autoincremento en PostgreSQL
    if (queryInterface.sequelize.getDialect() === "postgres") {
      await queryInterface.sequelize.query(`
        SELECT setval(
          pg_get_serial_sequence('public.forum_categories', 'id'),
          COALESCE((SELECT MAX(id) FROM public.forum_categories), 0) + 1,
          false
        );
      `);
    }
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("forum_categories", null, {});
  },
};