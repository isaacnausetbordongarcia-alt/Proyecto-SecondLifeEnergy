
"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Simulations", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      title: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },

      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      platform: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },

      url: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },

      objectives: {
        type: Sequelize.TEXT,
        allowNull: false,
      },

      materials: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("Simulations");
  },
};
