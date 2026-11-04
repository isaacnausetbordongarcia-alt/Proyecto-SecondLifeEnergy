"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("kit_components", [
      { kit_id: 1, component_id: 1, quantity: 5 },
      { kit_id: 2, component_id: 2, quantity: 10 },
      { kit_id: 3, component_id: 3, quantity: 15 },
      { kit_id: 4, component_id: 4, quantity: 20 },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("kit_components", null, {});
  },
};