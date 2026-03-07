const pool = require("./pool");

async function getAllGames() {
  const { rows } = await pool.query("SELECT * FROM game");

  return rows;
}

async function getGame(id) {
  const { rows } = await pool.query(`SELECT * FROM game WHERE id = ${id}`);

  return rows[0];
}

async function insertGame(title, description, price, rating) {
  await pool.query(
    "INSERT INTO GAME (title, description, price, rating) VALUES ($1,$2,$3,$4)",
    [title, description, price, rating],
  );
}

async function getAllGenres() {
  const { rows } = await pool.query("SELECT distinct genre FROM genre");

  return rows;
}

async function getGamesByGenre(genre) {
  const { rows } = await pool.query(
    `SELECT gm.title, gm.description, gm.price, gm.rating from game as gm join genre as gn on gm.id = gn.game_id where genre='${genre}'`,
  );

  return rows;
}

async function getAllDevelopers() {
  const { rows } = await pool.query("SELECT distinct developer FROM developer");
  return rows;
}

async function getGamesByDev(dev) {
  const { rows } = await pool.query(
    `SELECT gm.title, gm.description, gm.price, gm.rating from game as gm join developer as d on gm.id = d.game_id where developer='${dev}'`,
  );

  return rows;
}

module.exports = {
  getAllGames,
  getGame,
  insertGame,
  getAllGenres,
  getGamesByGenre,
  getAllDevelopers,
  getGamesByDev,
};
