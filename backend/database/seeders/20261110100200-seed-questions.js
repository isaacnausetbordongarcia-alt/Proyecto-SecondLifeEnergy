'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    // Requiere que existan forum_categories 1 y users 1, 2 y 3
    await queryInterface.bulkInsert("questions", [
      {
        id: 1,
        category_id: 1,
        author_id: 2,
        accepted_answer_id: null,
        title: "¿Cómo compruebo el estado de salud de una batería de segunda vida?",
        content: "Tengo un pack de un coche eléctrico y quiero saber cuánta capacidad real le queda antes de reutilizarlo.",
        status: "answered",
        created_at: now,
      },
      {
        id: 2,
        category_id: 1,
        author_id: 3,
        accepted_answer_id: null,
        title: "¿Qué inversor es compatible con un pack de 48 V reutilizado?",
        content: "Quiero montar un sistema doméstico con un pack reutilizado de 48 V. ¿Qué debo mirar al elegir el inversor?",
        status: "open",
        created_at: now,
      },
      {
        id: 3,
        category_id: 1,
        author_id: 2,
        accepted_answer_id: null,
        title: "¿Se pueden mezclar módulos de distintos fabricantes en un mismo pack?",
        content: "Tengo módulos de dos marcas distintas y me pregunto si es seguro juntarlos.",
        status: "open",
        created_at: now,
      },
    ], {});

    // Synchronize PostgreSQL autoincrement
    if (queryInterface.sequelize.getDialect() === "postgres") {
      await queryInterface.sequelize.query(`
        SELECT setval(
          pg_get_serial_sequence('public.questions', 'id'),
          COALESCE((SELECT MAX(id) FROM public.questions), 0) + 1,
          false
        );
      `);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("questions", { id: [1, 2, 3] });
  },
};
