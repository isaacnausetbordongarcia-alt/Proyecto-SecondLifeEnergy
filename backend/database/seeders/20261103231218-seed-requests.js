"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("requests", [
      {
        id: 1,
        reference: "REQ-2026-0001",
        contact_name: "Pedro Sánchez",
        contact_email: "pedro@example.com",
        notes: "Interesado en baterías de segunda vida para una instalación solar",
        status: "pending",
      },
      {
        id: 2,
        reference: "REQ-2026-0002",
        contact_name: "María López",
        contact_email: "maria@example.com",
        notes: "Solicito información sobre kits de almacenamiento",
        status: "in_progress",
      },
      {
        id: 3,
        reference: "REQ-2026-0003",
        contact_name: "IES El Rincón",
        contact_email: "contacto@ieselrincon.es",
        notes: null,
        status: "completed",
      },
    ]);

    // Ajustar el autoincremento en PostgreSQL
    if (queryInterface.sequelize.getDialect() === "postgres") {
      await queryInterface.sequelize.query(`
        SELECT setval(
          pg_get_serial_sequence('public.requests', 'id'),
          COALESCE((SELECT MAX(id) FROM public.requests), 0) + 1,
          false
        );
      `);
    }
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("requests", null, {});
  },
};