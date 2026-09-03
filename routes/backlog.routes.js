const router = require('express').Router();
const auth = require('../middleware/auth.middleware');
const backlogController = require('../controllers/backlog.controller');

router.use(auth);
router.get('/', backlogController.getAll);
router.get('/:id', backlogController.getById);
router.post('/', backlogController.create);
router.put('/:id', backlogController.update);
router.patch('/:id/status', backlogController.updateStatus);
router.delete('/:id', backlogController.remove);

module.exports = router;