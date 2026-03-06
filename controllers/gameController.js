const db = require("../db/queries");

const renderHome = (req, res) => res.render("home");

const renderAllGames = async (req, res) => {
  const games = await db.getAllGames();
  console.log(games);
};

const renderAllGenres = (req, res) => {
  console.log("All genres will be here");
};

const renderGenre = (req, res) => {
  const genre = req.params.genre;
  console.log(`This genre will be here ${genre}`);
};

const renderAllDevs = (req, res) => {
  console.log("All devs will be here");
};

const renderDev = (req, res) => {
  const dev = req.params.dev;
  console.log(`This dev will be here ${dev}`);
};

module.exports = {
  renderHome,
  renderAllGames,
  renderAllGenres,
  renderGenre,
  renderAllDevs,
  renderDev,
};
