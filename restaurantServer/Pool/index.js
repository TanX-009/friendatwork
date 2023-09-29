const Pool = require("pg").Pool;

module.exports.pool = new Pool({
  user: "admin",
  host: "localhost",
  database: "food",
  password: "come@mebro",
  port: 5432,
});
