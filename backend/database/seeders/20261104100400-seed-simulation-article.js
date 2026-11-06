"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    // Simulations: 1 Circuito serie/paralelo de celdas, 2 Instalación solar aislada
    const rows = [
      [1, 1], [1, 2], [1, 6], [1, 11],
      [2, 3], [2, 4], [2, 5], [2, 8], [2, 9],
    ].map(([simulationId, articleId]) => ({ simulation_id: simulationId, article_id: articleId }));

    await queryInterface.bulkInsert("simulation_articles", rows);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("simulation_articles", null, {});
  },
};
