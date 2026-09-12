const sequelize = require('../config/database');
const User = require('./user.model')(sequelize);
const Project = require('./project.model')(sequelize);
const Sprint = require('./sprint.model')(sequelize);
const Backlog = require('./backlog.model')(sequelize);
const BacklogActivity = require('./backlogActivity.model')(sequelize);


// Relasi User
User.hasMany(Project, { foreignKey: 'created_by' });
User.hasMany(Backlog, { foreignKey: 'created_by', as: 'createdBacklogs' });
User.hasMany(Backlog, { foreignKey: 'assigned_to', as: 'assignedBacklogs' });
User.hasMany(Sprint, { foreignKey: 'created_by' });

// Relasi Project
Project.belongsTo(User, { foreignKey: 'created_by', as: 'creator' });
Project.hasMany(Sprint, { foreignKey: 'project_id' });
Project.hasMany(Backlog, { foreignKey: 'project_id' });

// Relasi Sprint
Sprint.belongsTo(Project, { foreignKey: 'project_id' });
Sprint.hasMany(Backlog, { foreignKey: 'sprint_id' });

// Relasi Backlog
Backlog.belongsTo(Project, { foreignKey: 'project_id' });
Backlog.belongsTo(Sprint, { foreignKey: 'sprint_id' });
Backlog.belongsTo(User, { foreignKey: 'assigned_to', as: 'assignee' });
Backlog.belongsTo(User, { foreignKey: 'created_by', as: 'creator' });
Backlog.hasMany(BacklogActivity, { foreignKey: 'backlog_id' });

// Relasi BacklogActivity
BacklogActivity.belongsTo(Backlog, { foreignKey: 'backlog_id' });
BacklogActivity.belongsTo(User, { foreignKey: 'user_id' });

module.exports = { sequelize, User, Project, Sprint, Backlog, BacklogActivity };