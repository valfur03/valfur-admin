const connection = require("./modules/db_connect");
const uniqid = require("uniqid");
const bcrypt = require("bcrypt");

function truncate_user_table() {
	return (new Promise((resolve, reject) => {
		const query = "TRUNCATE user";
		connection.query(query, (error, result) => {
			return (error ? reject(error) : resolve(result));
		});
	}));
}

function add_user(user) {
	return (new Promise((resolve, reject) => {
		const query = "INSERT INTO user(session_id, username, email, password, level) VALUES(?, ?, ?, ?, ?)";
		connection.query(query, [user.session_id, user.username, user.email, user.password, user.level], (error, result) => {
			return (error ? reject(error) : resolve(result));
		});
	}));
}
async function init_db() {
	return (new Promise(async (resolve, reject) => {
		const user = {
			session_id: uniqid(),
			username: process.env.MASTER_USERNAME,
			email: process.env.MASTER_EMAIL,
			level: 0
		};
		const salt = bcrypt.genSaltSync(10);
		user.password = bcrypt.hashSync(process.env.MASTER_PASSWORD, salt);
		try {
			await truncate_user_table();
		} catch (error) {
			reject(console.error("Error when truncating the user table", error));
		}
		try {
			await add_user(user);
		} catch (error) {
			reject(console.error("Error when adding the user", error));
		}
		resolve(console.log("Success"));
	}));
}

init_db().then(() => {
	process.exit();
});