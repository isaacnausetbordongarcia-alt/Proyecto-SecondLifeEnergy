'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    // Requiere Simulations con id 1..4 (ver README)
    const rows = [
      [1, 1], [1, 2], [1, 6],
      [2, 3], [2, 5], [2, 4], [2, 9],
      [3, 2], [3, 3], [3, 7],
      [4, 8], [4, 12], [4, 11],
    ].map(([simulationId, articleId]) => ({ simulationId, articleId }));

    await queryInterface.bulkInsert('SimulationArticles', rows, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('SimulationArticles', { simulationId: { [Sequelize.Op.between]: [1, 4] } }, {});
  },
};
