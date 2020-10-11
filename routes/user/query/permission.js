const connection = require("../../../modules/db_connect");

function change_level(username, level) {
	return (new Promise(async (resolve, reject) => {
		const query = "UPDATE user SET level = ? WHERE username = ?";
		connection.query(query, [ level,  username ], async (error, result) => {
			return (error ? reject({code: 500, message: "Error when updating the user's level"}) : resolve(result));
		});
	}));
}

module.exports = { change_level };