const db = require("../db/queries");

const renderAllGenres = async (req, res) => {
  const genres = await db.getAllGenres();
  res.render("genre", {
    genres: genres,
  });
};

const renderGenre = async (req, res) => {
  const genre = req.params.genre;
  const games = await db.getGamesByGenre(genre);
  res.render("expand/genreExpand", {
    games: games,
  });
};

const renderGenreForm = async (req, res) => {
  res.render("form/genreForm");
};

const createGenre = async (req, res) => {
  const { genre } = req.body;

  await db.insertGenre(genre);

  res.redirect("/genre");
};

module.exports = {
  renderAllGenres,
  renderGenre,
  renderGenreForm,
  createGenre,
};
