'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const rows = [
      [1, 1], [1, 2], [1, 4],
      [2, 1], [2, 2], [2, 7],
      [3, 3], [3, 6],
      [4, 3],
      [5, 3],
    ].map(([articleId, resourceId]) => ({ articleId, resourceId }));

    await queryInterface.bulkInsert('ArticleResources', rows, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ArticleResources', { articleId: { [Sequelize.Op.between]: [1, 12] } }, {});
  },
};
