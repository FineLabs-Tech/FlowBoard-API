const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Sprint', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    start_date: DataTypes.DATE,
    due_date: DataTypes.DATE,
    status: { type: DataTypes.ENUM('PLANNED', 'ACTIVE', 'COMPLETED'), defaultValue: 'PLANNED' },
  }, {
    tableName: 'sprints',
    underscored: true,
  });
};