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

    const finalStartDate = start_date || new Date();

    if (due_date && new Date(due_date) < new Date(finalStartDate)) {
      return res.status(400).json({ message: 'Invalid date' });
    }

    sprint.status = 'ACTIVE';
    sprint.start_date = finalStartDate;
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

    // Tentuin start_date final: dari body kalau dikirim, atau yang udah ada di DB
    const effectiveStartDate = start_date !== undefined ? start_date : sprint.start_date;

    // Validasi 1: due_date nggak boleh diset kalau start_date belum ada sama sekali
    if (due_date !== undefined && !effectiveStartDate) {
      return res.status(400).json({ message: 'Set start date dulu sebelum set due date' });
    }

    // Validasi 2: due_date nggak boleh sebelum start_date
    if (due_date !== undefined && effectiveStartDate && new Date(due_date) < new Date(effectiveStartDate)) {
      return res.status(400).json({ message: 'Invalid Date' });
    }

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