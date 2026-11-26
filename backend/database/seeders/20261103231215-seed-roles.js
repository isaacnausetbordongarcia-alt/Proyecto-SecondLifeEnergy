"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("roles", [
      { id: 1, name: "ADMIN", description: "Total access to the platform" },
      { id: 2, name: "TEACHER", description: "Manages students and educational resources" },
      { id: 3, name: "CLIENT", description: "Registered user" },
      { id: 4, name: "GUEST", description: "Unregistered user" },
      { id: 5, name: "STUDENT", description: "Registered user by invitation" }
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