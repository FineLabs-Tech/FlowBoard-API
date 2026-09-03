const sequelize = require('../config/database');
const User = require('./user.model')(sequelize);
const Sprint = require('./sprint.model')(sequelize);
const Backlog = require('./backlog.model')(sequelize);
const BacklogActivity = require('./backlogActivity.model')(sequelize);

// Relasi
User.hasMany(Backlog, { foreignKey: 'created_by', as: 'createdBacklogs' });
User.hasMany(Backlog, { foreignKey: 'assigned_to', as: 'assignedBacklogs' });
User.hasMany(Sprint, { foreignKey: 'created_by' });
Sprint.hasMany(Backlog, { foreignKey: 'sprint_id' });
Backlog.belongsTo(Sprint, { foreignKey: 'sprint_id' });
Backlog.belongsTo(User, { foreignKey: 'assigned_to', as: 'assignee' });
Backlog.belongsTo(User, { foreignKey: 'created_by', as: 'creator' });
Backlog.hasMany(BacklogActivity, { foreignKey: 'backlog_id' });
BacklogActivity.belongsTo(Backlog, { foreignKey: 'backlog_id' });
BacklogActivity.belongsTo(User, { foreignKey: 'user_id' });

module.exports = { sequelize, User, Sprint, Backlog, BacklogActivity };