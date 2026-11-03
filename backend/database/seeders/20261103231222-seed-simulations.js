"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("Simulations", [
      {
        title: "Circuito serie y paralelo de celdas",
        description: "Montaje virtual de un pack de baterías",
        platform: "Tinkercad",
        url: "https://www.tinkercad.com/",
        objectives: "Entender cómo cambian tensión y capacidad al conectar celdas",
        materials: "Celdas 18650, multímetro virtual",
      },
      {
        title: "Instalación solar aislada",
        description: "Panel, regulador, batería e inversor",
        platform: "PhET",
        url: "https://phet.colorado.edu/",
        objectives: "Dimensionar una instalación básica",
        materials: null,
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("Simulations", null, {});
  },
};