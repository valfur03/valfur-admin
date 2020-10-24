const mysql = require("mysql");
const dotenv = require("dotenv");

dotenv.config();

module.exports = mysql.createPool({
	connectionLimit: 10,
	host: "localhost",
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	port: 3306,
	database: process.env.DB_NAME
});
