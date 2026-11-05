"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    // Tags: 1 Baterías, 2 Energía solar, 3 Reciclaje, 4 Seguridad, 5 Principiante
    const rows = [
      [1, 1], [1, 5],
      [2, 1],
      [3, 2],
      [4, 4], [4, 1], [4, 5],
      [5, 1],
      [6, 2], [6, 1],
      [7, 4], [7, 1],
      [8, 3], [8, 1], [8, 5],
      [9, 2],
      [10, 3], [10, 5],
    ].map(([resourceId, tagId]) => ({ resource_id: resourceId, tag_id: tagId }));

    await queryInterface.bulkInsert("resource_tags", rows);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("resource_tags", null, {});
  },
};
