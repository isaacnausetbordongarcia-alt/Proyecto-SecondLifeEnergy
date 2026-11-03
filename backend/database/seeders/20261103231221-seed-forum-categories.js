"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("forum_categories", [
      { name: "General", description: "Temas generales sobre el proyecto" },
      { name: "Baterías", description: "Dudas sobre baterías de segunda vida" },
      { name: "Instalaciones solares", description: "Montaje y configuración de paneles" },
      { name: "Seguridad", description: "Buenas prácticas y riesgos eléctricos" },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("forum_categories", null, {});
  },
};