"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    // [articleId, resourceId]
    const rows = [
      [1, 1], [1, 2], [1, 4],
      [2, 1], [2, 2], [2, 7],
      [3, 3], [3, 6],
      [4, 3],
      [5, 3],
      [6, 5], [6, 2],
      [7, 9],
      [8, 3], [8, 10],
      [9, 3],
      [11, 8], [11, 4],
      [12, 10], [12, 8],
    ].map(([articleId, resourceId]) => ({ articleId, resourceId }));

    await queryInterface.bulkInsert("ArticleResources", rows);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("ArticleResources", null, {});
  },
};
