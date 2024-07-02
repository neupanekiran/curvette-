const sql = require("mysql");
const dotenv = require("dotenv").config();

const db = sql.createConnection({
 host: 'localhost',
 user: 'root',
 password: 'root',
database: 'sql_login',
});
module.exports = db;
