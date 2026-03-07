const pool = require("./pool");

async function getAllGames() {
  const { rows } = await pool.query("SELECT * FROM game");

  return rows;
}

async function getGame(id) {
  const { rows } = await pool.query(`SELECT * FROM game WHERE id = $1`, [id]);

  return rows[0];
}

async function insertGame(title, description, price, rating) {
  const statement = await pool.query(
    "INSERT INTO GAME (title, description, price, rating) VALUES ($1,$2,$3,$4) RETURNING id",
    [title, description, price, rating],
  );

  return statement.rows[0].id;
}

async function insertGameGenres(id, genre) {
  await pool.query("INSERT INTO GENRE (game_id, genre) VALUES ($1,$2)", [
    id,
    genre,
  ]);
}

async function insertGameDevs(id, dev) {
  await pool.query(
    "INSERT INTO DEVELOPER (game_id, developer) VALUES ($1,$2)",
    [id, dev],
  );
}

async function updateGame(id, title, description, price, rating) {
  await pool.query(
    `UPDATE GAME SET title=$1, description=$2, price = $3, rating=$4 where id = $5`,
    [title, description, price, rating, id],
  );
}

async function getAllGenres() {
  const { rows } = await pool.query("SELECT distinct genre FROM genre");

  return rows;
}

async function getGamesByGenre(genre) {
  const { rows } = await pool.query(
    `SELECT gm.title, gm.description, gm.price, gm.rating from game as gm join genre as gn on gm.id = gn.game_id where genre=$1`,
    [genre],
  );

  return rows;
}

async function insertGenre(genre) {
  await pool.query(`INSERT INTO GENRE (genre) values ($1)`, [genre]);
}

async function getAllDevelopers() {
  const { rows } = await pool.query("SELECT distinct developer FROM developer");
  return rows;
}

async function getGamesByDev(dev) {
  const { rows } = await pool.query(
    `SELECT gm.title, gm.description, gm.price, gm.rating from game as gm join developer as d on gm.id = d.game_id where developer=$1`,
    [dev],
  );

  return rows;
}

async function insertDev(dev) {
  await pool.query(`INSERT INTO DEVELOPER (developer) values ($1)`, [dev]);
}

module.exports = {
  getAllGames,
  getGame,
  insertGame,
  getAllGenres,
  insertGameGenres,
  insertGameDevs,
  updateGame,
  getGamesByGenre,
  insertGenre,
  getAllDevelopers,
  getGamesByDev,
  insertDev,
};
