const mysql = require("mysql2");

const poll = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "node-complete",
  password: "1234",
});

module.exports = poll.promise();
