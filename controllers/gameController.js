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

  res.render("gameExpand", {
    game: game,
  });
};

const renderAllGenres = async (req, res) => {
  const genres = await db.getAllGenres();
  res.render("genre", {
    genres: genres,
  });
};

const renderGenre = async (req, res) => {
  const genre = req.params.genre;
  const games = await db.getGamesByGenre(genre);
  res.render("genreExpand", {
    games: games,
  });
};

const renderAllDevs = async (req, res) => {
  const devs = await db.getAllDevelopers();
  res.render("dev", {
    devs: devs,
  });
};

const renderDev = async (req, res) => {
  const dev = req.params.dev;
  const games = await db.getGamesByDev(dev);
  res.render("devExpand", {
    games: games,
  });
};

module.exports = {
  renderHome,
  renderAllGames,
  renderAllGenres,
  renderGenre,
  renderAllDevs,
  renderDev,
  renderGame,
};
