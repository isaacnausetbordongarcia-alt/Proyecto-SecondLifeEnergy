"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("requests", [
      {
        reference: "REQ-2026-0001",
        contactName: "Pedro Sánchez",
        contactEmail: "pedro@example.com",
        notes: "Interesado en baterías de segunda vida para una instalación solar",
        status: "pending",
      },
      {
        reference: "REQ-2026-0002",
        contactName: "María López",
        contactEmail: "maria@example.com",
        notes: "Solicito información sobre kits de almacenamiento",
        status: "in_progress",
      },
      {
        reference: "REQ-2026-0003",
        contactName: "IES El Rincón",
        contactEmail: "contacto@ieselrincon.es",
        notes: null,
        status: "completed",
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("requests", null, {});
  },
};