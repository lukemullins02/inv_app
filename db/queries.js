const pool = require("./pool");

async function getAllGames() {
  const { rows } = await pool.query("SELECT * from game");
  console.log(rows);
  return rows;
}

module.exports = {
  getAllGames,
};
