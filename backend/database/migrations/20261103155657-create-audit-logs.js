"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("audit_logs", {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: { model: "users", key: "id" },
        onDelete: "RESTRICT",
        onUpdate: "CASCADE",
      },
      entity: { type: Sequelize.STRING, allowNull: false },
      entity_id: { type: Sequelize.INTEGER.UNSIGNED, allowNull: false },
      action: { type: Sequelize.STRING, allowNull: false },
      previous_values: { type: Sequelize.JSON, allowNull: true },
      new_values: { type: Sequelize.JSON, allowNull: true },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });

    // Acelera las consultas del historial por entidad
    await queryInterface.addIndex("audit_logs", ["entity", "entity_id"], {
      name: "audit_logs_entity_entity_id",
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("audit_logs");
  },
};