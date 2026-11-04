'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    // Requiere Requests con id 1..5 (ver README)
    const items = [
      { id: 1, requestId: 1, articleId: 1, quantity: 2 },
      { id: 2, requestId: 1, articleId: 6, quantity: 2 },
      { id: 3, requestId: 2, articleId: 8, quantity: 1 },
      { id: 4, requestId: 2, articleId: 7, quantity: 1 },
      { id: 5, requestId: 3, articleId: 5, quantity: 4 },
    ];

    await queryInterface.bulkInsert('RequestItems', items, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('RequestItems', { id: { [Sequelize.Op.between]: [1, 10] } }, {});
  },
};
