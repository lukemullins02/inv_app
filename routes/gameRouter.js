const { Router } = require("express");

const {
  renderHome,
  renderAllGames,
  createGame,
  renderGame,
  renderGameForm,
  updateGameGet,
  updateGamePost,
  deleteGame,
} = require("../controllers/gameController");

const gameRouter = Router();

gameRouter.get("/", renderHome);

gameRouter.get("/game", renderAllGames);

gameRouter.get("/game/form", renderGameForm);

gameRouter.post("/game/form", createGame);

gameRouter.get("/game/:id", renderGame);

gameRouter.get("/game/:id/delete", deleteGame);

gameRouter.get("/game/:id/update", updateGameGet);

gameRouter.post("/game/:id/update", updateGamePost);

module.exports = gameRouter;
