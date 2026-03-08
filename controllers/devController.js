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

const renderDevForm = async (req, res) => {
  res.render("form/devForm");
};

const createDev = async (req, res) => {
  const { dev } = req.body;

  await db.insertDev(dev);

  res.redirect("/dev");
};

const deleteDev = async (req, res) => {
  const id = req.params.id;

  await db.deleteDev(id);

  res.redirect("/dev");
};

module.exports = {
  renderAllDevs,
  renderDev,
  renderDevForm,
  createDev,
  deleteDev,
};
