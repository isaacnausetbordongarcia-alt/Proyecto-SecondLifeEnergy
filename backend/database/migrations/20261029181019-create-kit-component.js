'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('kit_components', {
      kit_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        references: { model: 'articles', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },

      component_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        references: { model: 'articles', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },

      quantity: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 1,
      },
    });

    await queryInterface.addIndex('kit_components', ['component_id']);

    await queryInterface.addConstraint('kit_components', {
      fields: ['quantity'],
      type: 'check',
      where: { quantity: { [Sequelize.Op.gte]: 1 } },
      name: 'chk_kit_components_quantity_min',
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('kit_components');
  },
};