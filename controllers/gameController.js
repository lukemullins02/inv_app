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
  const genres = await db.getAllGenres();
  const devs = await db.getAllDevelopers();

  res.render("form/gameForm", {
    genres: genres,
    devs: devs,
  });
};

const createGame = async (req, res) => {
  const { title, description, price, rating, genres, devs } = req.body;

  const id = await db.insertGame(title, description, price, rating);

  for (let i = 0; i < genres.length; i++) {
    await db.insertGameGenres(id, genres[i]);
  }

  for (let i = 0; i < devs.length; i++) {
    await db.insertGameDevs(id, devs[i]);
  }

  res.redirect("/game");
};

module.exports = {
  renderHome,
  renderAllGames,
  renderGameForm,
  createGame,
  renderGame,
};
