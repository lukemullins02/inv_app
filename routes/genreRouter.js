const { Router } = require("express");

const {
  renderAllGenres,
  renderGenre,
  renderGenreForm,
  createGenre,
} = require("../controllers/genreController");

const genreRouter = Router();

genreRouter.get("/", renderAllGenres);

genreRouter.get("/form", renderGenreForm);

genreRouter.post("/form", createGenre);

genreRouter.get("/:genre", renderGenre);

module.exports = genreRouter;
