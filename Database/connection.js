const postgres = require("postgres");
require("dotenv").config();

const sql = postgres({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD
});

(async () => {
  try {
    const result = await sql`SELECT 1`;
    console.log("PostgreSQL Connected");
  } catch (err) {
    console.log("PostgreSQL Not Connected");
    console.log(err);
  }
})();

module.exports = sql;
