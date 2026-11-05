'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("article_categories", [
      {
        id: 1,
        name: "Baterías",
        description: "Todo sobre baterías y su segunda vida",
        parent_category_id: null,
      },
      {
        id: 2,
        name: "Paneles solares",
        description: "Paneles fotovoltaicos y su reutilización",
        parent_category_id: null,
      },
      {
        id: 3,
        name: "Baterías de litio reutilizadas",
        description: "Packs de litio procedentes de vehículos eléctricos",
        parent_category_id: 1,
      },
      {
        id: 4,
        name: "Inversores",
        description: "Inversores y controladores de carga",
        parent_category_id: null,
      },
    ], {});

    // Synchronize PostgreSQL autoincrement
    if (queryInterface.sequelize.getDialect() === "postgres") {
      await queryInterface.sequelize.query(`
        SELECT setval(
          pg_get_serial_sequence('public.article_categories', 'id'),
          COALESCE((SELECT MAX(id) FROM public.article_categories), 0) + 1,
          false
        );
      `);
    }
  },

  async down(queryInterface, Sequelize) {
    // Primero las hijas y luego las padres, por la FK autorreferenciada
    await queryInterface.bulkDelete("article_categories", { id: [3] });
    await queryInterface.bulkDelete("article_categories", { id: [1, 2, 4] });
  },
};
