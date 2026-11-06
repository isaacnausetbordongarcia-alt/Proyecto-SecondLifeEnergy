"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const d = (s) => new Date(s);
    const j = (o) => (o === null ? null : JSON.stringify(o));

    const logs = [
      { id: 1, user_id: 1, entity: "Article", entity_id: 1, action: "CREATE", previous_values: null, new_values: { name: "Módulo de batería 2ª vida Nissan Leaf 24 kWh", stock: 6, status: "available" }, created_at: d("2026-10-20T09:00:00Z") },
      { id: 2, user_id: 1, entity: "Article", entity_id: 2, action: "CREATE", previous_values: null, new_values: { name: "Pack LiFePO4 reacondicionado 5 kWh", stock: 10, status: "available" }, created_at: d("2026-10-20T09:10:00Z") },
      { id: 3, user_id: 2, entity: "Article", entity_id: 3, action: "CREATE", previous_values: null, new_values: { name: "Inversor híbrido 5 kW monofásico", stock: 4, status: "available" }, created_at: d("2026-10-20T10:00:00Z") },
      { id: 4, user_id: 3, entity: "Article", entity_id: 6, action: "UPDATE", previous_values: { stock: 8, status: "available" }, new_values: { stock: 3, status: "low_stock" }, created_at: d("2026-10-24T12:30:00Z") },
      { id: 5, user_id: 2, entity: "Article", entity_id: 10, action: "UPDATE", previous_values: { stock: 2, status: "low_stock" }, new_values: { stock: 0, status: "out_of_stock" }, created_at: d("2026-10-26T08:45:00Z") },
      { id: 6, user_id: 1, entity: "Resource", entity_id: 1, action: "CREATE", previous_values: null, new_values: { title: "Introducción a las baterías de segunda vida", status: "draft" }, created_at: d("2026-09-01T08:00:00Z") },
      { id: 7, user_id: 1, entity: "Resource", entity_id: 1, action: "UPDATE", previous_values: { status: "draft" }, new_values: { status: "published" }, created_at: d("2026-09-01T09:00:00Z") },
      { id: 8, user_id: 3, entity: "Resource", entity_id: 9, action: "CREATE", previous_values: null, new_values: { title: "Monitorización de consumo con Modbus y Raspberry Pi", status: "draft" }, created_at: d("2026-10-28T16:20:00Z") },
      { id: 9, user_id: 2, entity: "Request", entity_id: 3, action: "UPDATE", previous_values: { status: "in_progress" }, new_values: { status: "completed" }, created_at: d("2026-10-29T11:15:00Z") },
      { id: 10, user_id: 1, entity: "Resource", entity_id: 10, action: "UPDATE", previous_values: { difficulty: "intermediate" }, new_values: { difficulty: "beginner" }, created_at: d("2026-10-30T13:00:00Z") },
    ].map((l) => ({ ...l, previous_values: j(l.previous_values), new_values: j(l.new_values) }));

    await queryInterface.bulkInsert("audit_logs", logs);

    // Ajustar el autoincremento en PostgreSQL
    if (queryInterface.sequelize.getDialect() === "postgres") {
      await queryInterface.sequelize.query(`
        SELECT setval(
          pg_get_serial_sequence('public.audit_logs', 'id'),
          COALESCE((SELECT MAX(id) FROM public.audit_logs), 0) + 1,
          false
        );
      `);
    }
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("audit_logs", null, {});
  },
};
