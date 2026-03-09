const { Router } = require("express");

const {
  renderAllGenres,
  renderGenre,
  renderGenreForm,
  createGenre,
  deleteGenre,
  renderDeleteGenre,
} = require("../controllers/genreController");

const genreRouter = Router();

genreRouter.get("/", renderAllGenres);

genreRouter.get("/form", renderGenreForm);

genreRouter.post("/form", createGenre);

genreRouter.get("/:id/delete", renderDeleteGenre);

genreRouter.post("/:id/delete", deleteGenre);

genreRouter.get("/:genre", renderGenre);

module.exports = genreRouter;
