const router = require('express').Router();

router.use('/users', require('./user.routes'));
router.use('/auth', require('./auth.routes'));
router.use('/projects', require('./project.routes'));
router.use('/backlogs', require('./backlog.routes'));
router.use('/sprints', require('./sprint.routes'));
router.use('/board', require('./board.routes'));

module.exports = router;











// GA BUTUH KEKNYA

// const express = require("express");
// const router = express.Router();
// const userRoutes = require("./userRoutes");

// router.use("/users", userRoutes);

// // Add more feature routes here as the API grows, e.g.:
// // router.use("/products", productRoutes);

// module.exports = router;
