const { Router } = require("express");

const {
  renderAllDevs,
  renderDev,
  renderDevForm,
  createDev,
  deleteDev,
  renderDeleteDev,
} = require("../controllers/devController");

const devRouter = Router();

devRouter.get("/", renderAllDevs);

devRouter.get("/form", renderDevForm);

devRouter.post("/form", createDev);

devRouter.get("/:id/delete", renderDeleteDev);

devRouter.post("/:id/delete", deleteDev);

devRouter.get("/:dev", renderDev);

module.exports = devRouter;
