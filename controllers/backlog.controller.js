const { Backlog, User } = require('../models');
const { logActivity } = require('../services/activityLog.service');

exports.create = async (req, res, next) => {
  try {
    const { type, description, due_date, assigned_to, priority, sprint_id } = req.body;
    const backlog = await Backlog.create({
      type, description, due_date, assigned_to, priority, sprint_id,
      created_by: req.user.id,
      workflow: 'TODO',
    });
    await logActivity({ backlogId: backlog.id, userId: req.user.id, action: 'CREATE', newValue: backlog });
    res.status(201).json({ success: true, data: backlog });
  } catch (err) { next(err); }
};

exports.getAll = async (req, res, next) => {
  try {
    const { search, priority, workflow, sprint_id } = req.query;
    const where = {};
    if (priority) where.priority = priority;
    if (workflow) where.workflow = workflow;
    if (sprint_id) where.sprint_id = sprint_id;

    const backlogs = await Backlog.findAll({
      where,
      include: [
        { model: User, as: 'assignee', attributes: ['id', 'name', 'email'] },
        { model: User, as: 'creator', attributes: ['id', 'name', 'email'] },
      ],
    });
    res.json({ success: true, data: backlogs });
  } catch (err) { next(err); }
};

exports.getById = async (req, res, next) => {
  try {
    const backlog = await Backlog.findByPk(req.params.id);
    if (!backlog) return res.status(404).json({ message: 'Backlog tidak ditemukan' });
    res.json({ success: true, data: backlog });
  } catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
  try {
    const backlog = await Backlog.findByPk(req.params.id);
    if (!backlog) return res.status(404).json({ message: 'Backlog tidak ditemukan' });

    const oldValue = backlog.toJSON();
    await backlog.update(req.body);
    await logActivity({ backlogId: backlog.id, userId: req.user.id, action: 'UPDATE', oldValue, newValue: backlog });

    res.json({ success: true, data: backlog });
  } catch (err) { next(err); }
};

exports.updateStatus = async (req, res, next) => {
  try {
    const { workflow } = req.body;
    const backlog = await Backlog.findByPk(req.params.id);
    if (!backlog) return res.status(404).json({ message: 'Backlog tidak ditemukan' });

    const oldStatus = backlog.workflow;
    backlog.workflow = workflow;
    await backlog.save();

    await logActivity({
      backlogId: backlog.id, userId: req.user.id, action: 'STATUS_CHANGE',
      oldValue: { workflow: oldStatus }, newValue: { workflow },
    });

    res.json({ success: true, data: backlog });
  } catch (err) { next(err); }
};

exports.remove = async (req, res, next) => {
  try {
    const backlog = await Backlog.findByPk(req.params.id);
    if (!backlog) return res.status(404).json({ message: 'Backlog tidak ditemukan' });

    await logActivity({ backlogId: backlog.id, userId: req.user.id, action: 'DELETE', oldValue: backlog });
    await backlog.destroy();

    res.json({ success: true, message: 'Backlog dihapus' });
  } catch (err) { next(err); }
};