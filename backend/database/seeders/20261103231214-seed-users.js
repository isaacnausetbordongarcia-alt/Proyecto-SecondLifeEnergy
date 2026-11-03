"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("users", [
      { name: "Admin", email: "admin@secondlifeenergy.com", passwordHash: "hash-pendiente-admin", isActive: true },
      { name: "Laura Técnica", email: "laura@secondlifeenergy.com", passwordHash: "hash-pendiente-laura", isActive: true },
      { name: "Carlos Moderador", email: "carlos@secondlifeenergy.com", passwordHash: "hash-pendiente-carlos", isActive: true },
      { name: "Ana Usuaria", email: "ana@secondlifeenergy.com", passwordHash: "hash-pendiente-ana", isActive: false },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("users", null, {});
  },
};