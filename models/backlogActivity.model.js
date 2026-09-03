const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('BacklogActivity', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    action: DataTypes.ENUM('CREATE', 'UPDATE', 'DELETE', 'ASSIGN', 'STATUS_CHANGE', 'ADD_TO_SPRINT', 'REMOVE_FROM_SPRINT'),
    old_value: DataTypes.TEXT,
    new_value: DataTypes.TEXT,
  }, {
    tableName: 'backlog_activities',
    underscored: true,
    updatedAt: false,
  });
};