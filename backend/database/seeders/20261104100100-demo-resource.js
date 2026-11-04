'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const now = new Date();
    const d = (s) => new Date(s);

    const resources = [
      { id: 1, authorId: 1, title: 'Introducción a las baterías de segunda vida', description: 'Guía básica sobre qué son, de dónde proceden y cómo se evalúan.', type: 'guide', topic: 'baterías', difficulty: 'beginner', url: 'https://secondlifeenergy.example/recursos/intro-segunda-vida', status: 'published', publishedAt: d('2026-09-01') },
      { id: 2, authorId: 1, title: 'Cómo medir el estado de salud (SoH) de una celda', description: 'Tutorial paso a paso con ciclos de carga y medición de resistencia interna.', type: 'tutorial', topic: 'diagnóstico', difficulty: 'intermediate', url: 'https://secondlifeenergy.example/recursos/medir-soh', status: 'published', publishedAt: d('2026-09-05') },
      { id: 3, authorId: 2, title: 'Dimensionado de una instalación solar aislada', description: 'Cálculo de paneles, baterías y regulador para una vivienda aislada.', type: 'guide', topic: 'solar', difficulty: 'intermediate', url: 'https://secondlifeenergy.example/recursos/dimensionado-aislada', status: 'published', publishedAt: d('2026-09-10') },
      { id: 4, authorId: 2, title: 'Seguridad en el manejo de baterías de litio', description: 'Normas de seguridad, EPIs y qué hacer ante un fallo térmico.', type: 'document', topic: 'seguridad', difficulty: 'beginner', url: 'https://secondlifeenergy.example/recursos/seguridad-litio.pdf', status: 'published', publishedAt: d('2026-09-12') },
      { id: 5, authorId: 3, title: 'Configuración de un BMS con balanceo activo', description: 'Vídeo práctico sobre la configuración de parámetros de un BMS 16S.', type: 'video', topic: 'bms', difficulty: 'advanced', url: 'https://secondlifeenergy.example/recursos/configurar-bms', status: 'published', publishedAt: d('2026-09-20') },
    ].map((r) => ({ ...r, createdAt: now }));

    await queryInterface.bulkInsert('Resources', resources, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Resources', { id: { [Sequelize.Op.between]: [1, 10] } }, {});
  },
};
