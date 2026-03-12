const db = require("../db/queries");
const { body, validationResult, matchedData } = require("express-validator");

const passwordErr = "don't match. Try again.";

const validateDelete = [
  body("password")
    .equals(`${process.env.ADMIN_PASSWORD}`)
    .withMessage(`Passwords ${passwordErr}`),
];

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
    genre: genre,
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

const renderDeleteGenre = async (req, res) => {
  const id = req.params.id;

  res.render(`delete/genreDelete`, {
    id: id,
  });
};

const deleteGenre = [
  validateDelete,
  async (req, res) => {
    const id = req.params.id;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render(`delete/genreDelete`, {
        errors: errors.array(),
        id: id,
      });
    }

    await db.deleteGenre(id);

    res.redirect("/genre");
  },
];

module.exports = {
  renderAllGenres,
  renderGenre,
  renderGenreForm,
  createGenre,
  deleteGenre,
  renderDeleteGenre,
};
