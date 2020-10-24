const mysql = require("mysql");
const dotenv = require("dotenv");

dotenv.config();

module.exports = mysql.createPool({
	connectionLimit: 10,
	host: process.env.DB_HOST || "localhost",
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME
});
