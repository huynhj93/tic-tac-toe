const express = require('express');
const gameRoutes = require('./game');

const router = express.Router(); // eslint-disable-line new-cap

// mount game routes at /game
router.use('/game', gameRoutes);

module.exports = router;