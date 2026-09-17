const router = require('express').Router();
const auth = require('../middleware/auth.middleware');
const sprintController = require('../controllers/sprint.controller');

router.use(auth);
router.get('/', sprintController.getAll);
router.post('/', sprintController.create);
router.post('/:id/start', sprintController.start);
router.post('/:id/complete', sprintController.complete);
router.put('/:id', sprintController.update);
router.delete('/:id', sprintController.remove);

module.exports = router;