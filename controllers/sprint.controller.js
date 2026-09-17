const { Sprint } = require('../models');

exports.create = async (req, res, next) => {
  try {
    const { project_id, name, description } = req.body;
    const sprint = await Sprint.create({ project_id, name, description, created_by: req.user.id });
    res.status(201).json({ success: true, data: sprint });
  } catch (err) { next(err); }
};

exports.getAll = async (req, res, next) => {
  try {
    const sprints = await Sprint.findAll();
    res.json({ success: true, data: sprints });
  } catch (err) { next(err); }
};

exports.start = async (req, res, next) => {
  try {
    const { start_date, due_date } = req.body;
    const sprint = await Sprint.findByPk(req.params.id);
    if (!sprint) return res.status(404).json({ message: 'Sprint tidak ditemukan' });

    sprint.status = 'ACTIVE';
    sprint.start_date = start_date || new Date();
    sprint.due_date = due_date;
    await sprint.save();

    res.json({ success: true, data: sprint });
  } catch (err) { next(err); }
};

exports.complete = async (req, res, next) => {
  try {
    const sprint = await Sprint.findByPk(req.params.id);
    if (!sprint) return res.status(404).json({ message: 'Sprint tidak ditemukan' });

    sprint.status = 'COMPLETED';
    await sprint.save();

    res.json({ success: true, data: sprint });
  } catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
  try {
    const { name, description, start_date, due_date } = req.body;
    const sprint = await Sprint.findByPk(req.params.id);
    if (!sprint) return res.status(404).json({ message: 'Sprint tidak ditemukan' });

    if (name !== undefined) sprint.name = name;
    if (description !== undefined) sprint.description = description;
    if (start_date !== undefined) sprint.start_date = start_date;
    if (due_date !== undefined) sprint.due_date = due_date;
    await sprint.save();

    res.json({ success: true, data: sprint });
  } catch (err) { next(err); }
};

exports.remove = async (req, res, next) => {
  try {
    const sprint = await Sprint.findByPk(req.params.id);
    if (!sprint) return res.status(404).json({ message: 'Sprint tidak ditemukan' });

    await sprint.destroy();

    res.json({ success: true, message: 'Sprint berhasil dihapus' });
  } catch (err) { next(err); }
};