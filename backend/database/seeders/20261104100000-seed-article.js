"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const now = new Date();

    // category_id: 1 Baterías, 2 Inversores y control, 3 Paneles, 4 Cableado y accesorios, 5 Kits
    // created_by_id: 1 Admin, 2 Laura, 3 Carlos
    const articles = [
      { id: 1, category_id: 1, created_by_id: 1, name: "Módulo de batería 2ª vida Nissan Leaf 24 kWh", description: "Módulo de ion-litio procedente de vehículo eléctrico con un 78% de capacidad (SoH) verificado.", type: "battery", specifications: JSON.stringify({ chemistry: "NMC", nominalVoltage: "360V", capacityKWh: 24, soh: "78%" }), stock: 6, status: "available" },
      { id: 2, category_id: 1, created_by_id: 1, name: "Pack LiFePO4 reacondicionado 5 kWh", description: "Pack de 48 V reacondicionado, probado en ciclos de carga/descarga completos.", type: "battery", specifications: JSON.stringify({ chemistry: "LiFePO4", nominalVoltage: "51.2V", capacityKWh: 5, cycles: 3000 }), stock: 10, status: "available" },
      { id: 3, category_id: 2, created_by_id: 2, name: "Inversor híbrido 5 kW monofásico", description: "Inversor híbrido con entrada fotovoltaica y gestión de baterías de litio.", type: "inverter", specifications: JSON.stringify({ powerKW: 5, mppt: 2, efficiency: "97.6%", phase: "single" }), stock: 4, status: "available" },
      { id: 4, category_id: 2, created_by_id: 2, name: "Controlador de carga MPPT 60 A", description: "Regulador MPPT para sistemas aislados de 12/24/48 V con pantalla LCD.", type: "controller", specifications: JSON.stringify({ maxCurrentA: 60, systemVoltage: "12/24/48V", maxPvVoltage: "150V" }), stock: 8, status: "available" },
      { id: 5, category_id: 3, created_by_id: 1, name: "Panel solar monocristalino 450 W", description: "Panel de alta eficiencia para instalaciones residenciales y educativas.", type: "panel", specifications: JSON.stringify({ powerW: 450, efficiency: "21.2%", cells: 144, dimensionsMm: "2094x1038x35" }), stock: 20, status: "available" },
      { id: 6, category_id: 2, created_by_id: 3, name: "BMS inteligente 16S 100 A", description: "Sistema de gestión de batería con balanceo activo y comunicación CAN/RS485.", type: "bms", specifications: JSON.stringify({ cells: "16S", maxCurrentA: 100, balancing: "active", comms: ["CAN", "RS485"] }), stock: 3, status: "low_stock" },
      { id: 7, category_id: 4, created_by_id: 3, name: "Medidor de energía bidireccional", description: "Medidor monofásico con registro de consumo y generación vía Modbus.", type: "sensor", specifications: JSON.stringify({ phase: "single", protocol: "Modbus RTU", accuracy: "Class 1" }), stock: 12, status: "available" },
      { id: 8, category_id: 5, created_by_id: 1, name: "Kit solar aislado educativo 1 kW", description: "Kit completo para prácticas: paneles, regulador, batería e inversor.", type: "kit", specifications: JSON.stringify({ powerKW: 1, includes: ["panel", "controller", "battery", "inverter"] }), stock: 2, status: "low_stock" },
      { id: 9, category_id: 4, created_by_id: 2, name: "Cable solar 6 mm² (rollo 100 m)", description: "Cable fotovoltaico doble aislamiento, resistente a UV.", type: "cable", specifications: JSON.stringify({ sectionMm2: 6, lengthM: 100, ratedVoltage: "1.5kV DC" }), stock: 15, status: "available" },
      { id: 10, category_id: 4, created_by_id: 2, name: "Estructura de montaje en cubierta (4 paneles)", description: "Estructura de aluminio para cubierta inclinada.", type: "mounting", specifications: JSON.stringify({ material: "aluminio anodizado", panels: 4, tiltRange: "10-35°" }), stock: 0, status: "out_of_stock" },
      { id: 11, category_id: 1, created_by_id: 3, name: "Celdas 18650 recicladas (lote de 100)", description: "Celdas clasificadas por capacidad y resistencia interna para proyectos DIY y docentes.", type: "cell", specifications: JSON.stringify({ format: "18650", avgCapacityMah: 2100, quantity: 100 }), stock: 25, status: "available" },
      { id: 12, category_id: 5, created_by_id: 1, name: "Kit demostración de almacenamiento 2ª vida", description: "Maqueta didáctica para mostrar el reaprovechamiento de baterías.", type: "kit", specifications: JSON.stringify({ includes: ["battery", "bms", "meter"], display: "LCD" }), stock: 5, status: "draft" },
    ].map((a) => ({ ...a, created_at: now, updated_at: now }));

    await queryInterface.bulkInsert("articles", articles);

    // Ajustar el autoincremento en PostgreSQL
    if (queryInterface.sequelize.getDialect() === "postgres") {
      await queryInterface.sequelize.query(`
        SELECT setval(
          pg_get_serial_sequence('public.articles', 'id'),
          COALESCE((SELECT MAX(id) FROM public.articles), 0) + 1,
          false
        );
      `);
    }
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("articles", null, {});
  },
};