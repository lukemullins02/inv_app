const express = require("express");
const app = express();
const path = require("node:path");
const gameRouter = require("./routes/gameRouter");
const devRouter = require("./routes/devRouter");
const genreRouter = require("./routes/genreRouter");
const assetsPath = path.join(__dirname, "public");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(assetsPath));

app.use("/", gameRouter);
app.use("/dev", devRouter);
app.use("/genre", genreRouter);

const PORT = 3000;

app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Listening on port ${PORT}`);
});
