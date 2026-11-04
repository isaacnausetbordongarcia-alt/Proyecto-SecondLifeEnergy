"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("article_categories", [
      { name: "Baterías", description: "Baterías y celdas de segunda vida", parent_category_id: null },
      { name: "Inversores y control", description: "Inversores, reguladores y BMS", parent_category_id: null },
      { name: "Paneles solares", description: "Paneles fotovoltaicos", parent_category_id: null },
      { name: "Cableado y accesorios", description: "Cables, estructuras y medidores", parent_category_id: null },
      { name: "Kits didácticos", description: "Kits completos para prácticas y demostraciones", parent_category_id: null },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("article_categories", null, {});
  },
};
