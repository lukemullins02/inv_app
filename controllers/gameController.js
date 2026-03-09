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
    const genre_id = await db.getGenre(genres[i]);

    await db.insertGameGenres(id, genre_id);
  }

  for (let i = 0; i < devs.length; i++) {
    const dev_id = await db.getDev(devs[i]);
    await db.insertGameDevs(id, dev_id);
  }

  res.redirect("/game");
};

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

const updateGamePost = async (req, res) => {
  const id = req.params.id;

  const { title, description, price, rating, genres, devs } = req.body;

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
};

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
