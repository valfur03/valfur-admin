const router = require("express").Router();
const connection = require("./modules/db_connect");
const uniqid = require("uniqid");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
	const user = {
		session_id: uniqid(),
		username: process.env.MASTER_USERNAME,
		email: process.env.MASTER_EMAIL,
		level: 0
	};
	const salt = bcrypt.genSaltSync(10);
	user.password = bcrypt.hashSync(process.env.MASTER_PASSWORD, salt);
	try {
		const query = "TRUNCATE user";
		connection.query(query, () => {
			try {
				const query = "INSERT INTO user(session_id, username, email, password, level) VALUES(?, ?, ?, ?, ?)";
				connection.query(query, [user.session_id, user.username, user.email, user.password, user.level]);
			} catch (error) {
				console.log(error);
				return (res.status(500).send("Error when adding the user"));
			}
		});
	} catch (error) {
		return (res.status(500).send("Error when truncating the database"));
	}
	return (res.send("Success"));
});

module.exports = router;