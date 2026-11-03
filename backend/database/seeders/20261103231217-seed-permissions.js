"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("permissions", [
      { code: "users.manage", description: "Crear, editar y desactivar usuarios" },
      { code: "articles.create", description: "Crear artículos" },
      { code: "articles.review", description: "Revisar artículos" },
      { code: "stock.manage", description: "Registrar movimientos de stock" },
      { code: "resources.publish", description: "Publicar recursos" },
      { code: "forum.moderate", description: "Moderar preguntas y respuestas" },
      { code: "requests.manage", description: "Gestionar solicitudes" },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("permissions", null, {});
  },
};