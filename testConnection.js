const sequelize = require('./config/database');

sequelize.authenticate()
  .then(() => console.log('Koneksi ke PostgreSQL berhasil'))
  .catch((err) => console.error('Gagal konek:', err));