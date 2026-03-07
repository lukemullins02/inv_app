const { Router } = require("express");

const { renderAllDevs, renderDev } = require("../controllers/devController");

const devRouter = Router();

devRouter.get("/", renderAllDevs);

devRouter.get("/:dev", renderDev);

module.exports = devRouter;
