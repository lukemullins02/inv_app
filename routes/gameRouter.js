const { Router } = require("express");

const {
  renderHome,
  renderAllGames,
  renderAllGenres,
  renderGenre,
  renderAllDevs,
  renderDev,
  renderGame,
} = require("../controllers/gameController");

const gameRouter = Router();

gameRouter.get("/", renderHome);

gameRouter.get("/game", renderAllGames);

gameRouter.get("/game/:id", renderGame);

gameRouter.get("/genre", renderAllGenres);

gameRouter.get("/genre/:genre", renderGenre);

gameRouter.get("/dev", renderAllDevs);

gameRouter.get("/dev/:dev", renderDev);

module.exports = gameRouter;
