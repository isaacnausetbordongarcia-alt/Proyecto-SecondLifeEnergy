"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("tags", [
      { id: 1, name: "Baterías", slug: "baterias" },
      { id: 2, name: "Energía solar", slug: "energia-solar" },
      { id: 3, name: "Reciclaje", slug: "reciclaje" },
      { id: 4, name: "Seguridad", slug: "seguridad" },
      { id: 5, name: "Principiante", slug: "principiante" },
    ]);

    // Ajustar el autoincremento en PostgreSQL
    if (queryInterface.sequelize.getDialect() === "postgres") {
      await queryInterface.sequelize.query(`
        SELECT setval(
          pg_get_serial_sequence('public.tags', 'id'),
          COALESCE((SELECT MAX(id) FROM public.tags), 0) + 1,
          false
        );
      `);
    }
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("tags", null, {});
  },
};