"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    // Requests: 1 REQ-2026-0001, 2 REQ-2026-0002, 3 REQ-2026-0003
    await queryInterface.bulkInsert("RequestItems", [
      { requestId: 1, articleId: 1, quantity: 2 },
      { requestId: 1, articleId: 6, quantity: 2 },
      { requestId: 2, articleId: 8, quantity: 1 },
      { requestId: 2, articleId: 7, quantity: 1 },
      { requestId: 3, articleId: 5, quantity: 4 },
      { requestId: 3, articleId: 4, quantity: 1 },
      { requestId: 3, articleId: 9, quantity: 1 },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("RequestItems", null, {});
  },
};
