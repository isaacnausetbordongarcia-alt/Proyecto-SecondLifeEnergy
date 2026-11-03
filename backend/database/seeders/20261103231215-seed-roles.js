"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("roles", [
      { name: "admin", description: "Acceso total a la plataforma" },
      { name: "technician", description: "Gestiona artículos y stock" },
      { name: "moderator", description: "Modera el foro" },
      { name: "user", description: "Usuario registrado" },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("roles", null, {});
  },
};