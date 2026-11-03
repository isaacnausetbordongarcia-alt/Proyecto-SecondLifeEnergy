"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("tags", [
      { name: "Baterías", slug: "baterias" },
      { name: "Energía solar", slug: "energia-solar" },
      { name: "Reciclaje", slug: "reciclaje" },
      { name: "Seguridad", slug: "seguridad" },
      { name: "Principiante", slug: "principiante" },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("tags", null, {});
  },
};