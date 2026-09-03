'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('backlogs', {
      id: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true },
      type: { type: Sequelize.ENUM('STORY', 'FEATURE', 'TASK', 'BUG'), allowNull: false },
      description: { type: Sequelize.TEXT, allowNull: false },
      due_date: { type: Sequelize.DATE, allowNull: true },
      assigned_to: {
        type: Sequelize.UUID,
        references: { model: 'users', key: 'id' },
        onDelete: 'SET NULL',
      },
      workflow: {
        type: Sequelize.ENUM('TODO', 'IN_PROGRESS', 'IN_REVIEW', 'DONE'),
        defaultValue: 'TODO',
      },
      priority: { type: Sequelize.ENUM('LOW', 'MEDIUM', 'HIGH'), defaultValue: 'MEDIUM' },
      created_by: {
        type: Sequelize.UUID,
        references: { model: 'users', key: 'id' },
        onDelete: 'SET NULL',
      },
      sprint_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: { model: 'sprints', key: 'id' },
        onDelete: 'SET NULL',
      },
      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
      updated_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('backlogs');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_backlogs_type";');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_backlogs_workflow";');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_backlogs_priority";');
  },
};