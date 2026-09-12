const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Backlog', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    project_id: { type: DataTypes.UUID, allowNull: false },
    title: { type: DataTypes.STRING, allowNull: false },
    type: DataTypes.ENUM('STORY', 'FEATURE', 'TASK', 'BUG'),
    description: DataTypes.TEXT,
    due_date: DataTypes.DATE,
    workflow: { type: DataTypes.ENUM('TODO', 'IN_PROGRESS', 'IN_REVIEW', 'DONE'), defaultValue: 'TODO' },
    priority: { type: DataTypes.ENUM('LOW', 'MEDIUM', 'HIGH'), defaultValue: 'MEDIUM' },
  }, {
    tableName: 'backlogs',
    underscored: true,
  });
};