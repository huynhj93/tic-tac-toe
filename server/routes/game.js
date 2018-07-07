const express = require('express');
const gameCtrl = require('../controllers/game');

const router = express.Router();

router.route('/')
  .get(gameCtrl.getGame)
  .post(gameCtrl.createGame)
  .put(gameCtrl.updateGame);

module.exports = router;