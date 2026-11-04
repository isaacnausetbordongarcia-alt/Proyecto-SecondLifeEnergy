'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const d = (s) => new Date(s);
    const j = (o) => (o === null ? null : JSON.stringify(o));

    const logs = [
      { id: 1, userId: 1, entity: 'Article', entityId: 1, action: 'CREATE', previousValues: null, newValues: { name: 'Módulo de batería 2ª vida Nissan Leaf 24 kWh', stock: 6, status: 'available' }, createdAt: d('2026-10-20T09:00:00Z') },
      { id: 2, userId: 1, entity: 'Article', entityId: 2, action: 'CREATE', previousValues: null, newValues: { name: 'Pack LiFePO4 reacondicionado 5 kWh', stock: 10, status: 'available' }, createdAt: d('2026-10-20T09:10:00Z') },
      { id: 3, userId: 2, entity: 'Article', entityId: 3, action: 'CREATE', previousValues: null, newValues: { name: 'Inversor híbrido 5 kW monofásico', stock: 4, status: 'available' }, createdAt: d('2026-10-20T10:00:00Z') },
      { id: 4, userId: 3, entity: 'Article', entityId: 6, action: 'UPDATE', previousValues: { stock: 8, status: 'available' }, newValues: { stock: 3, status: 'low_stock' }, createdAt: d('2026-10-24T12:30:00Z') },
      { id: 5, userId: 2, entity: 'Article', entityId: 10, action: 'UPDATE', previousValues: { stock: 2, status: 'low_stock' }, newValues: { stock: 0, status: 'out_of_stock' }, createdAt: d('2026-10-26T08:45:00Z') },
    ].map((l) => ({ ...l, previousValues: j(l.previousValues), newValues: j(l.newValues) }));

    await queryInterface.bulkInsert('AuditLogs', logs, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('AuditLogs', { id: { [Sequelize.Op.between]: [1, 10] } }, {});
  },
};
