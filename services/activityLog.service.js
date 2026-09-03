const { BacklogActivity } = require('../models');

exports.logActivity = async ({ backlogId, userId, action, oldValue = null, newValue = null }) => {
  await BacklogActivity.create({
    backlog_id: backlogId,
    user_id: userId,
    action,
    old_value: oldValue ? JSON.stringify(oldValue) : null,
    new_value: newValue ? JSON.stringify(newValue) : null,
  });
};