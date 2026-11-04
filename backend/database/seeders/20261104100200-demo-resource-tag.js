'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    // Requiere Tags con id 1..8 (ver README)
    const rows = [
      [1, 1], [1, 3],
      [2, 1], [2, 3], [2, 7],
      [3, 2],
      [4, 4], [4, 1],
      [5, 6], [5, 1],
    ].map(([resourceId, tagId]) => ({ resourceId, tagId }));

    await queryInterface.bulkInsert('ResourceTags', rows, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ResourceTags', { resourceId: { [Sequelize.Op.between]: [1, 10] } }, {});
  },
};
