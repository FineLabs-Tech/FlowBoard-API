const router = require('express').Router();
const auth = require('../middleware/auth.middleware');
const boardController = require('../controllers/board.controller');

router.use(auth);
router.get('/:sprintId', boardController.getBoard);

module.exports = router;