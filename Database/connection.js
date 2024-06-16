const postgres = require("postgres");
require("dotenv").config();
const logger = require("pino")();

const sql = postgres({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

(async () => {
  try {
    const result = await sql`SELECT 1`;
   
    logger.info("PostgreSQL Connected");
  } catch (err) {
    logger.error("PostgreSQL Not Connected");
    logger.error(err);
  }
})();

module.exports = sql;
