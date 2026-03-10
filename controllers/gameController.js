const db = require("../db/queries");
const { body, validationResult, matchedData } = require("express-validator");

const renderHome = (req, res) => res.render("home");

const titleErr = "must be 176 characters or less.";
const descErr = "must be 800 characters or less.";
const priceErr = "must be between $0 and $1000.";
const ratingErr = "must be between 1 and 10.";
const passwordErr = "don't match. Try again.";

const validateGame = [
  body("title").isLength({ max: 176 }).withMessage(`Title ${titleErr}`),
  body("description")
    .isLength({ max: 800 })
    .withMessage(`Description ${descErr}`),
  body("price")
    .isFloat({ min: 0, max: 1000 })
    .withMessage(`Price ${priceErr}.`),
  body("rating").isInt({ min: 1, max: 10 }).withMessage(`Rating ${ratingErr}`),
  body("genres"),
  body("devs"),
  body("password")
    .equals(process.env.ADMIN_PASSWORD)
    .withMessage(`Passwords ${passwordErr}`),
];

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

const createGame = [
  validateGame,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const err_genres = await db.getAllGenres();
      const err_devs = await db.getAllDevelopers();
      return res.status(400).render("form/gameForm", {
        errors: errors.array(),
        genres: err_genres,
        devs: err_devs,
      });
    }

    const { title, description, price, rating, genres, devs } =
      matchedData(req);

    const id = await db.insertGame(title, description, price, rating);

    let genreArr;
    let devArr;

    if (!Array.isArray(genres)) {
      genreArr = [genres];
    } else {
      genreArr = genres;
    }

    if (!Array.isArray(devs)) {
      devArr = [devs];
    } else {
      devArr = devs;
    }

    for (let i = 0; i < genreArr.length; i++) {
      const genre_id = await db.getGenre(genreArr[i]);

      await db.insertGameGenres(id, genre_id);
    }

    for (let i = 0; i < devArr.length; i++) {
      const dev_id = await db.getDev(devArr[i]);
      await db.insertGameDevs(id, dev_id);
    }

    res.redirect("/game");
  },
];

const updateGameGet = async (req, res) => {
  const id = req.params.id;

  const game = await db.getGame(id);

  const sel_genres = await db.getGenresByGame(id);

  const sel_devs = await db.getDevsByGame(id);

  for (let i = 0; i < sel_genres.length; i++) {
    sel_genres[i] = sel_genres[i].genre;
  }

  for (let i = 0; i < sel_devs.length; i++) {
    sel_devs[i] = sel_devs[i].developer;
  }

  const genres = await db.getAllGenres();
  const devs = await db.getAllDevelopers();

  res.render("update/updateGame", {
    game: game,
    genres: genres,
    devs: devs,
    sel_genres: sel_genres,
    sel_devs: sel_devs,
  });
};

const updateGamePost = [
  validateGame,
  async (req, res) => {
    const errors = validationResult(req);
    const id = req.params.id;

    if (!errors.isEmpty()) {
      const err_genres = await db.getAllGenres();
      const err_devs = await db.getAllDevelopers();
      const err_game = await db.getGame(id);
      const err_sel_genres = await db.getGenresByGame(id);

      const err_sel_devs = await db.getDevsByGame(id);

      for (let i = 0; i < err_sel_genres.length; i++) {
        err_sel_genres[i] = err_sel_genres[i].genre;
      }

      for (let i = 0; i < err_sel_devs.length; i++) {
        err_sel_devs[i] = err_sel_devs[i].developer;
      }

      return res.status(400).render("update/updateGame", {
        errors: errors.array(),
        game: err_game,
        genres: err_genres,
        devs: err_devs,
        sel_genres: err_sel_genres,
        sel_devs: err_sel_devs,
      });
    }

    const { title, description, price, rating, genres, devs } =
      matchedData(req);

    await db.deleteGenreGame(id);
    await db.deleteDevGame(id);

    let genreArr;
    let devArr;

    if (!Array.isArray(genres)) {
      genreArr = [genres];
    } else {
      genreArr = genres;
    }

    if (!Array.isArray(devs)) {
      devArr = [devs];
    } else {
      devArr = devs;
    }

    for (let i = 0; i < genreArr.length; i++) {
      const genre_id = await db.getGenre(genreArr[i]);
      await db.insertGameGenres(id, genre_id);
    }

    for (let i = 0; i < devArr.length; i++) {
      const dev_id = await db.getDev(devArr[i]);
      await db.insertGameDevs(id, dev_id);
    }

    await db.updateGame(id, title, description, price, rating);

    res.redirect("/game");
  },
];

const renderDeleteGame = async (req, res) => {
  const id = req.params.id;

  res.render(`delete/gameDelete`, {
    id: id,
  });
};

const deleteGame = async (req, res) => {
  const { password } = req.body;
  const id = req.params.id;

  if (password === process.env.ADMIN_PASSWORD) {
    await db.deleteGame(id);
  } else {
    console.log("Nope");
  }

  res.redirect("/game");
};

module.exports = {
  renderHome,
  renderAllGames,
  renderGameForm,
  createGame,
  renderGame,
  updateGameGet,
  updateGamePost,
  deleteGame,
  renderDeleteGame,
};
