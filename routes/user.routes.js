const router = require('express').Router();
const auth = require('../middleware/auth.middleware');
const role = require('../middleware/role.middleware');
const userController = require('../controllers/user.controller');

router.use(auth);

router.get('/', userController.getAll);            // semua user bisa akses (buat dropdown assignee)
router.get('/me', userController.getMe);           // info user yg lagi login
router.put('/me', userController.updateMe);        // edit profile sendiri
router.delete('/:id', role('ADMIN'), userController.deleteUser); // ADMIN only

module.exports = router;