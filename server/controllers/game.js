const Game = require('../models/game');
const dataStore = require('../data-store');

function createGame(req, res, next) {
  try {
    if (!req.body.dimensions) {
      return next({
        message: 'Please specify the dimensions of the board \n',
        status: 422
      })
    }
    dataStore.game = new Game(req.body.dimensions);
    res.status(201).send(dataStore.game.render());
  } catch (e) {
    return next({
      message: 'Error in creating game',
      status: 500
    })
  }
}

function getGame(req, res, next) {
  try {
    if (!dataStore.game) {
      return next({
        message: 'No game found. Please create a game via a POST to /api/game',
        status: 404
      })
    }
    res.send(dataStore.game.render()); 
  } catch (e) {
    return next({
      message: 'Error in retrieving game',
      status: 500
    })
  }
}

function updateGame(req, res, next) {
  try {
    if (!dataStore.game) {
      return next({
        message: 'Game not found. Please create a game via a POST to /api/game',
        status: 404
      })
    }
    // Zero based array, subtract 1
    dataStore.game.markSquare(req.body.row - 1, req.body.col - 1, req.body.char);
    return res.send(dataStore.game.render());
  } catch (err) {
    return next({
      message: err,
      status: typeof err === 'string' ? 400 : 500
    })
  }
}

module.exports = {
  createGame,
  getGame,
  updateGame
}