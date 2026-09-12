const { Project, User } = require('../models');

exports.create = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const project = await Project.create({
      name, description,
      created_by: req.user.id,
    });
    res.status(201).json({ success: true, data: project });
  } catch (err) { next(err); }
};

exports.getAll = async (req, res, next) => {
  try {
    const projects = await Project.findAll({
      include: [{ model: User, as: 'creator', attributes: ['id', 'name', 'email'] }],
    });
    res.json({ success: true, data: projects });
  } catch (err) { next(err); }
};

exports.getById = async (req, res, next) => {
  try {
    const project = await Project.findByPk(req.params.id, {
      include: [{ model: User, as: 'creator', attributes: ['id', 'name', 'email'] }],
    });
    if (!project) return res.status(404).json({ message: 'Project tidak ditemukan' });
    res.json({ success: true, data: project });
  } catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project tidak ditemukan' });

    await project.update(req.body);
    res.json({ success: true, data: project });
  } catch (err) { next(err); }
};

exports.remove = async (req, res, next) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project tidak ditemukan' });

    await project.destroy();
    res.json({ success: true, message: 'Project berhasil dihapus' });
  } catch (err) { next(err); }
};