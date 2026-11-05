"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("simulations", [
      {
        id: 1,
        title: "Circuito serie y paralelo de celdas",
        description: "Montaje virtual de un pack de baterías",
        platform: "Tinkercad",
        url: "https://www.tinkercad.com/",
        objectives: "Entender cómo cambian tensión y capacidad al conectar celdas",
        materials: "Celdas 18650, multímetro virtual",
      },
      {
        id: 2,
        title: "Instalación solar aislada",
        description: "Panel, regulador, batería e inversor",
        platform: "PhET",
        url: "https://phet.colorado.edu/",
        objectives: "Dimensionar una instalación básica",
        materials: null,
      },
    ]);

    // Ajustar el autoincremento en PostgreSQL
    if (queryInterface.sequelize.getDialect() === "postgres") {
      await queryInterface.sequelize.query(`
        SELECT setval(
          pg_get_serial_sequence('public.simulations', 'id'),
          COALESCE((SELECT MAX(id) FROM public.simulations), 0) + 1,
          false
        );
      `);
    }
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("simulations", null, {});
  },
};