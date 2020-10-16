const router = require("express").Router();
const connection = require("./modules/db_connect");
const data_log = require("./modules/log");

router.get("/", (req, res) => {
	const query = "SELECT id FROM users";
	connection.query(query);
	data_log("Warm up", "Server warmed up, and everything is OK.", "log");
	res.send("Success");
})

module.exports = router;