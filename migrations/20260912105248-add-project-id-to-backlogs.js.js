'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('backlogs', 'project_id', {
      type: Sequelize.UUID,
      allowNull: true,
      references: { model: 'projects', key: 'id' },
      onDelete: 'CASCADE',
    });
  },
  down: async (queryInterface) => {
    await queryInterface.removeColumn('backlogs', 'project_id');
  },
};