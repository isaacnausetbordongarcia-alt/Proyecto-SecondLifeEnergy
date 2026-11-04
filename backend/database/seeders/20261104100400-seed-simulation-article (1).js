"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    // Simulations: 1 Circuito serie/paralelo de celdas, 2 Instalación solar aislada
    const rows = [
      [1, 1], [1, 2], [1, 6], [1, 11],
      [2, 3], [2, 4], [2, 5], [2, 8], [2, 9],
    ].map(([simulationId, articleId]) => ({ simulationId, articleId }));

    await queryInterface.bulkInsert("SimulationArticles", rows);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("SimulationArticles", null, {});
  },
};
