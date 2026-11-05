"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const d = (s) => new Date(s);
    const j = (o) => (o === null ? null : JSON.stringify(o));

    const logs = [
      { userId: 1, entity: "Article", entityId: 1, action: "CREATE", previousValues: null, newValues: { name: "Módulo de batería 2ª vida Nissan Leaf 24 kWh", stock: 6, status: "available" }, createdAt: d("2026-10-20T09:00:00Z") },
      { userId: 1, entity: "Article", entityId: 2, action: "CREATE", previousValues: null, newValues: { name: "Pack LiFePO4 reacondicionado 5 kWh", stock: 10, status: "available" }, createdAt: d("2026-10-20T09:10:00Z") },
      { userId: 2, entity: "Article", entityId: 3, action: "CREATE", previousValues: null, newValues: { name: "Inversor híbrido 5 kW monofásico", stock: 4, status: "available" }, createdAt: d("2026-10-20T10:00:00Z") },
      { userId: 3, entity: "Article", entityId: 6, action: "UPDATE", previousValues: { stock: 8, status: "available" }, newValues: { stock: 3, status: "low_stock" }, createdAt: d("2026-10-24T12:30:00Z") },
      { userId: 2, entity: "Article", entityId: 10, action: "UPDATE", previousValues: { stock: 2, status: "low_stock" }, newValues: { stock: 0, status: "out_of_stock" }, createdAt: d("2026-10-26T08:45:00Z") },
      { userId: 1, entity: "Resource", entityId: 1, action: "CREATE", previousValues: null, newValues: { title: "Introducción a las baterías de segunda vida", status: "draft" }, createdAt: d("2026-09-01T08:00:00Z") },
      { userId: 1, entity: "Resource", entityId: 1, action: "UPDATE", previousValues: { status: "draft" }, newValues: { status: "published" }, createdAt: d("2026-09-01T09:00:00Z") },
      { userId: 3, entity: "Resource", entityId: 9, action: "CREATE", previousValues: null, newValues: { title: "Monitorización de consumo con Modbus y Raspberry Pi", status: "draft" }, createdAt: d("2026-10-28T16:20:00Z") },
      { userId: 2, entity: "Request", entityId: 3, action: "UPDATE", previousValues: { status: "in_progress" }, newValues: { status: "completed" }, createdAt: d("2026-10-29T11:15:00Z") },
      { userId: 1, entity: "Resource", entityId: 10, action: "UPDATE", previousValues: { difficulty: "intermediate" }, newValues: { difficulty: "beginner" }, createdAt: d("2026-10-30T13:00:00Z") },
    ].map((l) => ({ ...l, previousValues: j(l.previousValues), newValues: j(l.newValues) }));

    await queryInterface.bulkInsert("AuditLogs", logs);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("AuditLogs", null, {});
  },
};
