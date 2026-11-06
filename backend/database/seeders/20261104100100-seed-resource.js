"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const now = new Date();
    const d = (s) => new Date(s);

    // author_id: 1 Admin, 2 Laura, 3 Carlos
    // published_at es NOT NULL en la migración: los borradores llevan la fecha prevista de publicación.
    const resources = [
      { id: 1, author_id: 1, title: "Introducción a las baterías de segunda vida", description: "Guía básica sobre qué son, de dónde proceden y cómo se evalúan.", type: "guide", topic: "baterías", difficulty: "beginner", url: "https://secondlifeenergy.example/recursos/intro-segunda-vida", status: "published", published_at: d("2026-09-01") },
      { id: 2, author_id: 1, title: "Cómo medir el estado de salud (SoH) de una celda", description: "Tutorial paso a paso con ciclos de carga y medición de resistencia interna.", type: "tutorial", topic: "diagnóstico", difficulty: "intermediate", url: "https://secondlifeenergy.example/recursos/medir-soh", status: "published", published_at: d("2026-09-05") },
      { id: 3, author_id: 2, title: "Dimensionado de una instalación solar aislada", description: "Cálculo de paneles, baterías y regulador para una vivienda aislada.", type: "guide", topic: "solar", difficulty: "intermediate", url: "https://secondlifeenergy.example/recursos/dimensionado-aislada", status: "published", published_at: d("2026-09-10") },
      { id: 4, author_id: 2, title: "Seguridad en el manejo de baterías de litio", description: "Normas de seguridad, EPIs y qué hacer ante un fallo térmico.", type: "document", topic: "seguridad", difficulty: "beginner", url: "https://secondlifeenergy.example/recursos/seguridad-litio.pdf", status: "published", published_at: d("2026-09-12") },
      { id: 5, author_id: 3, title: "Configuración de un BMS con balanceo activo", description: "Vídeo práctico sobre la configuración de parámetros de un BMS 16S.", type: "video", topic: "bms", difficulty: "advanced", url: "https://secondlifeenergy.example/recursos/configurar-bms", status: "published", published_at: d("2026-09-20") },
      { id: 6, author_id: 3, title: "Conexión de un inversor híbrido a baterías reutilizadas", description: "Artículo técnico sobre compatibilidad de tensiones y protocolos de comunicación.", type: "article", topic: "inversores", difficulty: "advanced", url: "https://secondlifeenergy.example/recursos/inversor-hibrido", status: "published", published_at: d("2026-10-01") },
      { id: 7, author_id: 1, title: "Mantenimiento preventivo de sistemas de almacenamiento", description: "Checklist de revisiones periódicas para instalaciones con baterías.", type: "document", topic: "mantenimiento", difficulty: "beginner", url: "https://secondlifeenergy.example/recursos/mantenimiento.pdf", status: "published", published_at: d("2026-10-05") },
      { id: 8, author_id: 2, title: "Economía circular y reciclaje de baterías", description: "Panorama del ciclo de vida de una batería y opciones de reciclaje.", type: "article", topic: "reciclaje", difficulty: "beginner", url: "https://secondlifeenergy.example/recursos/economia-circular", status: "published", published_at: d("2026-10-10") },
      { id: 9, author_id: 3, title: "Monitorización de consumo con Modbus y Raspberry Pi", description: "Práctica para registrar generación y consumo en tiempo real.", type: "tutorial", topic: "monitorización", difficulty: "intermediate", url: "https://secondlifeenergy.example/recursos/modbus-raspberry", status: "draft", published_at: d("2026-11-15") },
      { id: 10, author_id: 1, title: "Diseño de una maqueta didáctica de almacenamiento", description: "Propuesta de proyecto para aulas con materiales reutilizados.", type: "guide", topic: "educación", difficulty: "beginner", url: "https://secondlifeenergy.example/recursos/maqueta-didactica", status: "draft", published_at: d("2026-11-20") },
    ].map((r) => ({ ...r, created_at: now }));

    await queryInterface.bulkInsert("resources", resources);

    // Ajustar el autoincremento en PostgreSQL
    if (queryInterface.sequelize.getDialect() === "postgres") {
      await queryInterface.sequelize.query(`
        SELECT setval(
          pg_get_serial_sequence('public.resources', 'id'),
          COALESCE((SELECT MAX(id) FROM public.resources), 0) + 1,
          false
        );
      `);
    }
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("resources", null, {});
  },
};
