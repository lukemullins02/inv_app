const { Router } = require("express");

const {
  renderAllGenres,
  renderGenre,
} = require("../controllers/genreController");

const genreRouter = Router();

genreRouter.get("/", renderAllGenres);

genreRouter.get("/:genre", renderGenre);

module.exports = genreRouter;
