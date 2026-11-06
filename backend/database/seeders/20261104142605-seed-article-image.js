"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("article_images", [
      { id: 1, article_id: 1, url: "image1.jpg", alt_text: "Image 1", sort_order: 1 },
      { id: 2, article_id: 2, url: "image2.jpg", alt_text: "Image 2", sort_order: 2 },
      { id: 3, article_id: 3, url: "image3.jpg", alt_text: "Image 3", sort_order: 3 },
      { id: 4, article_id: 4, url: "image4.jpg", alt_text: "Image 4", sort_order: 4 },
    ]);

    // Ajustar el autoincremento en PostgreSQL
    if (queryInterface.sequelize.getDialect() === "postgres") {
      await queryInterface.sequelize.query(`
        SELECT setval(
          pg_get_serial_sequence('public.article_images', 'id'),
          COALESCE((SELECT MAX(id) FROM public.article_images), 0) + 1,
          false
        );
      `);
    }
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("article_images", null, {});
  },
};