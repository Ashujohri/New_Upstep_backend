var mysql = require("mysql");

var pool = mysql.createPool({
  host: "campusshala.com",
  port: 3306,
  user: "campussh_upstep",
  password: "upstep123@@",
  database: "campussh_upstep",
  connectionLimit: 1000,
  multipleStatements: true,
  charset: "utf8",
});

// var pool = mysql.createPool({
//   host: "localhost",
//   port: 3306,
//   user: "root",
//   password: "123",
//   database: "upstep_local",
//   connectionLimit: 1000,
//   multipleStatements: true,
//   charset: "utf8",
// });

module.exports = pool;
