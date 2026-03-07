const { Router } = require("express");

const {
  renderHome,
  renderAllGames,
  createGame,
  renderAllGenres,
  renderGenre,
  renderGame,
  renderGameForm,
} = require("../controllers/gameController");

const gameRouter = Router();

gameRouter.get("/", renderHome);

gameRouter.get("/game", renderAllGames);

gameRouter.get("/game/form", renderGameForm);

gameRouter.post("/game/form", createGame);

gameRouter.get("/game/:id", renderGame);

module.exports = gameRouter;
