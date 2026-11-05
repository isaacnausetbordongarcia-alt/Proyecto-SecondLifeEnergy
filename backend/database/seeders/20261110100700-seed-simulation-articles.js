'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Requiere simulations 1 y 2, y articles 1, 2 y 3
    await queryInterface.bulkInsert("simulation_articles", [
      { simulation_id: 1, article_id: 1 },
      { simulation_id: 1, article_id: 2 },
      { simulation_id: 2, article_id: 3 },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("simulation_articles", {
      simulation_id: [1, 2],
    });
  },
};
