const db = require("../db/queries");

const renderAllDevs = async (req, res) => {
  const devs = await db.getAllDevelopers();
  res.render("dev", {
    devs: devs,
  });
};

const renderDev = async (req, res) => {
  const dev = req.params.dev;
  const games = await db.getGamesByDev(dev);
  res.render("expand/devExpand", {
    games: games,
  });
};

module.exports = {
  renderAllDevs,
  renderDev,
};
