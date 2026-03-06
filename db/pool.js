require("dotenv").config();
const { Pool } = require("pg");

module.exports = new Pool({
  host: "localhost",
  user: `${process.env.USERNAME}`,
  database: `${process.env.DB}`,
  password: `${process.env.PASSWORD}`,
  port: 5432,
});
