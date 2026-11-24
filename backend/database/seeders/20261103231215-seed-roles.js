"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("roles", [
      { id: 1, name: "admin", description: "Acceso total a la plataforma" },
      { id: 2, name: "docente", description: "Gestiona alumnos y recursos educativos" },
      { id: 3, name: "invitado", description: "Usuario no registrado" },
      { id: 4, name: "cliente", description: "Usuario registrado" },
      { id: 5, name: "alumno", description: "Usuario registrado por invitación" }
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