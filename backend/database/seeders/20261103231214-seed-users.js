"use strict";
const bcrypt = require("bcryptjs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    // Ids fijos: el resto de seeders usa los usuarios 1 a 4
    await queryInterface.bulkInsert("users", [
      { id: 1, name: "Admin", email: "admin@secondlifeenergy.com", password_hash: await bcrypt.hash("mysecret", 12), is_active: true },
      { id: 2, name: "Profesor", email: "profesor@secondlifeenergy.com", password_hash: await bcrypt.hash("mysecret", 12), is_active: true },
      { id: 3, name: "Carlos Moderador", email: "carlos@secondlifeenergy.com", password_hash: await bcrypt.hash("mysecret", 12), is_active: true },
      { id: 4, name: "Ana Usuaria", email: "ana@secondlifeenergy.com", password_hash: await bcrypt.hash("mysecret", 12), is_active: false },
    ]);

    // Ajustar el autoincremento en PostgreSQL
    if (queryInterface.sequelize.getDialect() === "postgres") {
      await queryInterface.sequelize.query(`
        SELECT setval(
          pg_get_serial_sequence('public.users', 'id'),
          COALESCE((SELECT MAX(id) FROM public.users), 0) + 1,
          false
        );
      `);
    }
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("users", null, {});
  },
};