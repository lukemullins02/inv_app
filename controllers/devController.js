const db = require("../db/queries");
const { body, validationResult, matchedData } = require("express-validator");

const passwordErr = "don't match. Try again.";

const validateDelete = [
  body("password")
    .equals(`${process.env.ADMIN_PASSWORD}`)
    .withMessage(`Passwords ${passwordErr}`),
];

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
    dev: dev,
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

const renderDeleteDev = async (req, res) => {
  const id = req.params.id;

  res.render(`delete/devDelete`, {
    id: id,
  });
};

const deleteDev = [
  validateDelete,
  async (req, res) => {
    const id = req.params.id;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render(`delete/devDelete`, {
        errors: errors.array(),
        id: id,
      });
    }

    await db.deleteDev(id);

    res.redirect("/dev");
  },
];

module.exports = {
  renderAllDevs,
  renderDev,
  renderDevForm,
  createDev,
  deleteDev,
  renderDeleteDev,
};
