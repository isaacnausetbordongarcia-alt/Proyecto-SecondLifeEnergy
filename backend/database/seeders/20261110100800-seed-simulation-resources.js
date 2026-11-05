'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Requiere simulations 1 y 2, y resources 1 y 2
    await queryInterface.bulkInsert("simulation_resources", [
      { simulation_id: 1, resource_id: 1 },
      { simulation_id: 1, resource_id: 2 },
      { simulation_id: 2, resource_id: 2 },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("simulation_resources", {
      simulation_id: [1, 2],
    });
  },
};
