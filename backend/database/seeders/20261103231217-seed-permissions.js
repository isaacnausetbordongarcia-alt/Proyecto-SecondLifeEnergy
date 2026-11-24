"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("permissions", [
      { id: 1, code: "users.read", description: "Leer usuarios" },
      { id: 2, code: "users.create", description: "Crear usuarios" },
      { id: 3, code: "users.update", description: "Actualizar usuarios" },
      { id: 4, code: "users.delete", description: "Eliminar usuarios" },

      { id: 5, code: "roles.read", description: "Leer roles" },
      { id: 6, code: "roles.create", description: "Crear roles" },
      { id: 7, code: "roles.update", description: "Actualizar roles" },
      { id: 8, code: "roles.delete", description: "Eliminar roles" },

      { id: 9, code: "permissions.read", description: "Leer permisos" },
      { id: 10, code: "permissions.create", description: "Crear permisos" },
      { id: 11, code: "permissions.update", description: "Actualizar permisos" },
      { id: 12, code: "permissions.delete", description: "Eliminar permisos" },
    

      { id: 13, code: "requests.read", description: "Leer solicitudes" },
      { id: 14, code: "requests.create", description: "Crear solicitudes" },
      { id: 15, code: "requests.update", description: "Actualizar solicitudes" },
      { id: 16, code: "requests.delete", description: "Eliminar solicitudes" },

      { id: 17, code: "tags.read", description: "Leer etiquetas" },
      { id: 18, code: "tags.create", description: "Crear etiquetas" },
      { id: 19, code: "tags.update", description: "Actualizar etiquetas" },
      { id: 20, code: "tags.delete", description: "Eliminar etiquetas" },

      {id: 21, code: "simulations.read", description: "Leer simulaciones"},
      {id: 22, code: "simulations.create", description: "Crear simulaciones"},
      {id: 23, code: "simulations.update", description: "Actualizar simulaciones"},
      {id: 24, code: "simulations.delete", description: "Eliminar simulaciones"},

      {id: 25, code: "forumcategories.read", description: "Leer categorías del foro"},
      {id: 26, code: "forumcategories.create", description: "Crear categorías del foro"},
      {id: 27, code: "forumcategories.update", description: "Actualizar categorías del foro"},
      {id: 28, code: "forumcategories.delete", description: "Eliminar categorías del foro"},

    ]);

    // Ajustar el autoincremento en PostgreSQL
    if (queryInterface.sequelize.getDialect() === "postgres") {
      await queryInterface.sequelize.query(`
        SELECT setval(
          pg_get_serial_sequence('public.permissions', 'id'),
          COALESCE((SELECT MAX(id) FROM public.permissions), 0) + 1,
          false
        );
      `);
    }
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("permissions", null, {});
  },
};