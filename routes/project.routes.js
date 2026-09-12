const router = require('express').Router();
const auth = require('../middleware/auth.middleware');
const projectController = require('../controllers/project.controller');

router.use(auth);
router.get('/', projectController.getAll);
router.get('/:id', projectController.getById);
router.post('/', projectController.create);
router.put('/:id', projectController.update);
router.delete('/:id', projectController.remove);

module.exports = router;