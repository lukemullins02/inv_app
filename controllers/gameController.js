const db = require("../db/queries");

const renderHome = (req, res) => res.render("home");

const renderAllGames = async (req, res) => {
  const games = await db.getAllGames();

  res.render("game", {
    games: games,
  });
};

const renderGame = async (req, res) => {
  const id = req.params.id;
  const game = await db.getGame(id);

  res.render("expand/gameExpand", {
    game: game,
  });
};

const renderGameForm = async (req, res) => {
  res.render("form/gameForm");
};

const createGame = async (req, res) => {
  const { title, description, price, rating } = req.body;

  await db.insertGame(title, description, price, rating);

  res.redirect("/game");
};

module.exports = {
  renderHome,
  renderAllGames,
  renderGameForm,
  createGame,
  renderGame,
};
