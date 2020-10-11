const router = require("express").Router();
const connection = require("./modules/db_connect");

router.get("/", (req, res) => {
	const query = "SELECT id FROM users";
	connection.query(query);
})

module.exports = router;