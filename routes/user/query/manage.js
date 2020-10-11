const connection = require("../../../modules/db_connect");

function add_user(user) {
	return (new Promise(async (resolve, reject) => {
		const { session_id, username, email, password, level } = user;
		if (password) {
			const salt = await bcrypt.genSalt(10);
			var hashedPassword = await bcrypt.hash(password, salt);
		} else {
			var hashedPassword = "0";
		}
		const query = "INSERT INTO user(session_id, username, email, password, level) VALUES(?, ?, ?, ?, ?)";
		connection.query(query, [ session_id, username, email, hashedPassword, level ], async (error, result) => {
			return (error ? reject({code: 500, message: "Error when adding the user"}) : resolve(result));
		});
	}));
}

function update_username(username, user) {
	return (new Promise(async (resolve, reject) => {
		const query = "UPDATE user SET session_id = ?, username = ? WHERE username = ?";
		connection.query(query, [ user.session_id, user.username, username ], async (error, result) => {
			return (error ? reject({code: 500, message: "Error when updating the user"}) : resolve(result));
		});
	}));
}

function delete_user(username) {
	return (new Promise(async (resolve, reject) => {
		const query = "DELETE FROM user WHERE username = ?";
		connection.query(query, [ username ], async (error, result) => {
			return (error ? reject({code: 500, message: "Error when deleting the user"}) : resolve(result));
		});
	}));
}

module.exports = { add_user, update_username, delete_user };