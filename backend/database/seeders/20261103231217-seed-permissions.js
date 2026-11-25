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

      {id: 29, code: "user-role.read", description: "Leer asignaciones de roles a usuarios"},
      {id: 30, code: "user-role.create", description: "Crear asignaciones de roles a usuarios"},
      {id: 31, code: "user-role.update", description: "Actualizar asignaciones de roles a usuarios"},
      {id: 32, code: "user-role.delete", description: "Eliminar asignaciones de roles a usuarios"},

      {id: 33, code: "role-permissions.read", description: "Leer permisos de roles"},
      {id: 34, code: "role-permissions.create", description: "Crear permisos de roles"},
      {id: 35, code: "role-permissions.update", description: "Actualizar permisos de roles"},
      {id: 36, code: "role-permissions.delete", description: "Eliminar permisos de roles"},

      {id: 37, code: "kit-components.read", description: "Leer componentes del kit"},
      {id: 38, code: "kit-components.create", description: "Crear componentes del kit"},
      {id: 39, code: "kit-components.update", description: "Actualizar componentes del kit"},
      {id: 40, code: "kit-components.delete", description: "Eliminar componentes del kit"},

      {id: 41, code: "article-image.read", description: "Leer imágenes de artículos"},
      {id: 42, code: "article-image.create", description: "Crear imágenes de artículos"},
      {id: 43, code: "article-image.update", description: "Actualizar imágenes de artículos"},
      {id: 44, code: "article-image.delete", description: "Eliminar imágenes de artículos"},

      {id: 45, code: "invitations.read", description: "Leer invitaciones"},
      {id: 46, code: "invitations.create", description: "Crear invitaciones"},
      {id: 47, code: "invitations.update", description: "Actualizar invitaciones"},
      {id: 48, code: "invitations.delete", description: "Eliminar invitaciones"},

      {id: 49, code: "stock-movements.read", description: "Leer movimientos de stock"},
      {id: 50, code: "stock-movements.create", description: "Crear movimientos de stock"},
      {id: 51, code: "stock-movements.update", description: "Actualizar movimientos de stock"},
      {id: 52, code: "stock-movements.delete", description: "Eliminar movimientos de stock"}

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