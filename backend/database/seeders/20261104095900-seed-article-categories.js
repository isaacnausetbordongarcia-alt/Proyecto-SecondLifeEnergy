'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    // Los ids 1-5 son los que usa el seeder de artículos
    await queryInterface.bulkInsert("article_categories", [
      { id: 1, name: "Baterías", description: "Baterías y celdas de segunda vida", parent_category_id: null },
      { id: 2, name: "Inversores y control", description: "Inversores, reguladores y BMS", parent_category_id: null },
      { id: 3, name: "Paneles solares", description: "Paneles fotovoltaicos", parent_category_id: null },
      { id: 4, name: "Cableado y accesorios", description: "Cables, estructuras y medidores", parent_category_id: null },
      { id: 5, name: "Kits didácticos", description: "Kits completos para prácticas y demostraciones", parent_category_id: null },
      { id: 6, name: "Baterías de litio reutilizadas", description: "Packs de litio procedentes de vehículos eléctricos", parent_category_id: 1 },
    ]);

    // Ajustar el autoincremento en PostgreSQL
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

  async down(queryInterface) {
    // Primero la subcategoría y después las principales (FK autorreferenciada)
    await queryInterface.bulkDelete("article_categories", { id: [6] });
    await queryInterface.bulkDelete("article_categories", { id: [1, 2, 3, 4, 5] });
  },
};
