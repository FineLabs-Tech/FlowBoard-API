const bcrypt = require('bcrypt');
const { User } = require('../models');

exports.getAll = async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'name', 'email', 'role', 'created_at'],
    });
    res.json({ success: true, data: users });
  } catch (err) { next(err); }
};

exports.getMe = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ['id', 'name', 'email', 'role', 'created_at'],
    });
    res.json({ success: true, data: user });
  } catch (err) { next(err); }
};

exports.updateMe = async (req, res, next) => {
  try {
    const { name, password } = req.body;
    const user = await User.findByPk(req.user.id);

    if (name) user.name = name;
    if (password) user.password = await bcrypt.hash(password, 10);
    await user.save();

    res.json({ success: true, data: { id: user.id, name: user.name, email: user.email } });
  } catch (err) { next(err); }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'User tidak ditemukan' });

    await user.destroy();
    res.json({ success: true, message: 'User berhasil dihapus' });
  } catch (err) { next(err); }
};