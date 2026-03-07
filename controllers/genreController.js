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

module.exports = {
  renderAllGenres,
  renderGenre,
};
