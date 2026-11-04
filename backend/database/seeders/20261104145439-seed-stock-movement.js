"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {

    await queryInterface.bulkInsert("stock_movements", [
      { article_id: 1, user_id: 1, type: "entry", quantity: 10,  reason: "Initial stock", created_at: new Date() },
      { article_id: 2, user_id: 2, type: "entry", quantity: 5, reason: "Initial stock", created_at: new Date() },
      { article_id: 3, user_id: 3, type: "entry", quantity: 15, reason: "Initial stock", created_at: new Date() },
      { article_id: 4, user_id: 4, type: "entry", quantity: 8, reason: "Initial stock", created_at: new Date() },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("stock_movements", null, {});
  },
};