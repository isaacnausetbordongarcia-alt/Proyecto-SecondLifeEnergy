"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("AuditLogs", {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: { model: "users", key: "id" },
        onDelete: "RESTRICT",
        onUpdate: "CASCADE",
      },
      entity: { type: Sequelize.STRING, allowNull: false },
      entityId: { type: Sequelize.INTEGER.UNSIGNED, allowNull: false },
      action: { type: Sequelize.STRING, allowNull: false },
      previousValues: { type: Sequelize.JSON, allowNull: true },
      newValues: { type: Sequelize.JSON, allowNull: true },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });

    // Acelera las consultas del historial por entidad
    await queryInterface.addIndex("AuditLogs", ["entity", "entityId"], {
      name: "audit_logs_entity_entity_id",
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("AuditLogs");
  },
};