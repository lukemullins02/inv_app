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

async function deleteGame(id) {
  await pool.query("DELETE FROM GAME WHERE id = $1", [id]);
}

async function insertGameGenres(game_id, genre_id) {
  await pool.query(
    "INSERT INTO GENRE_GAME (game_id, genre_id) VALUES ($1,$2)",
    [game_id, genre_id],
  );
}

async function insertGameDevs(game_id, dev_id) {
  await pool.query("INSERT INTO dev_game (game_id, dev_id) VALUES ($1,$2)", [
    game_id,
    dev_id,
  ]);
}

async function updateGame(id, title, description, price, rating) {
  await pool.query(
    `UPDATE GAME SET title=$1, description=$2, price = $3, rating=$4 where id = $5`,
    [title, description, price, rating, id],
  );
}

async function getAllGenres() {
  const { rows } = await pool.query("SELECT * FROM genre order by genre");

  return rows;
}

async function getGenre(genre) {
  const { rows } = await pool.query("SELECT id from genre where genre = $1", [
    genre,
  ]);
  return rows[0].id;
}

async function getGamesByGenre(genre) {
  const { rows } = await pool.query(
    `SELECT gm.title, gm.description, gm.price, gm.rating from game as gm join genre_game as gn_gm on gm.id = gn_gm.game_id join genre as gn on gn_gm.genre_id = gn.id  where genre=$1`,
    [genre],
  );

  return rows;
}

async function getGenresByGame(id) {
  const { rows } = await pool.query(
    `SELECT gn.genre from game as gm join genre_game as gn_gm on gm.id = gn_gm.game_id join genre as gn on gn_gm.genre_id = gn.id  where gm.id=$1`,
    [id],
  );

  return rows;
}

async function insertGenre(genre) {
  await pool.query(`INSERT INTO GENRE (genre) values ($1)`, [genre]);
}

async function deleteGenre(id) {
  await pool.query("DELETE FROM GENRE WHERE id = $1", [id]);
}

async function deleteGenreGame(id) {
  await pool.query("DELETE FROM GENRE_GAME WHERE game_id = $1", [id]);
}

async function getAllDevelopers() {
  const { rows } = await pool.query(
    "SELECT * FROM developer order by developer",
  );
  return rows;
}

async function getGamesByDev(dev) {
  const { rows } = await pool.query(
    `SELECT gm.title, gm.description, gm.price, gm.rating from game as gm join dev_game as dev_gm on gm.id = dev_gm.game_id join developer as dev on dev_gm.dev_id = dev.id  where developer=$1`,
    [dev],
  );

  return rows;
}

async function getDevsByGame(id) {
  const { rows } = await pool.query(
    `SELECT dev.developer from game as gm join dev_game as dev_gm on gm.id = dev_gm.game_id join developer as dev on dev_gm.dev_id = dev.id  where gm.id=$1`,
    [id],
  );

  return rows;
}

async function getDev(dev) {
  const { rows } = await pool.query(
    "SELECT id from developer where developer = $1",
    [dev],
  );
  return rows[0].id;
}

async function insertDev(dev) {
  await pool.query(`INSERT INTO DEVELOPER (developer) values ($1)`, [dev]);
}

async function deleteDev(id) {
  await pool.query("DELETE FROM DEVELOPER WHERE id = $1", [id]);
}

async function deleteDevGame(id) {
  await pool.query("DELETE FROM DEV_GAME WHERE game_id = $1", [id]);
}

module.exports = {
  getAllGames,
  getGame,
  insertGame,
  deleteGame,
  getAllGenres,
  insertGameGenres,
  insertGameDevs,
  updateGame,
  getGamesByGenre,
  insertGenre,
  deleteGenre,
  deleteGenreGame,
  getGenre,
  getAllDevelopers,
  getGamesByDev,
  insertDev,
  getDev,
  deleteDev,
  getGenresByGame,
  getDevsByGame,
  deleteDevGame,
};
