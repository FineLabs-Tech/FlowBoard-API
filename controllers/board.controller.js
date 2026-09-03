const { Backlog, User } = require('../models');

exports.getBoard = async (req, res, next) => {
  try {
    const { sprintId } = req.params;
    const backlogs = await Backlog.findAll({
      where: { sprint_id: sprintId },
      include: [{ model: User, as: 'assignee', attributes: ['id', 'name'] }],
    });

    const board = { TODO: [], IN_PROGRESS: [], IN_REVIEW: [], DONE: [] };
    backlogs.forEach((b) => board[b.workflow].push(b));

    res.json({ success: true, data: board });
  } catch (err) { next(err); }
};