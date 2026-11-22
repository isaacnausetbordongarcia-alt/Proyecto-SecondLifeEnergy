"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("examen_audit", [
      { description: "Alta de un nuevo artículo", operation: "CREATE", user_id: 1, created_at: new Date(), updated_at: new Date() },
      { description: "Alta de un recurso formativo", operation: "CREATE", user_id: 2, created_at: new Date(), updated_at: new Date() },
      { description: "Cambio de stock de un artículo", operation: "MODIFY", user_id: 2, created_at: new Date(), updated_at: new Date() },
      { description: "Consulta de solicitudes", operation: "READ", user_id: 3, created_at: new Date(), updated_at: new Date() },
      { description: "Registro sin operación", operation: null, user_id: 1, created_at: new Date(), updated_at: new Date() },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("examen_audit", null, {});
  },
};