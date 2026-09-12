'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('backlogs', 'title', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'Untitled',
      after: 'type', // urutan kolom (opsional)
    });
  },
  down: async (queryInterface) => {
    await queryInterface.removeColumn('backlogs', 'title');
  },
};