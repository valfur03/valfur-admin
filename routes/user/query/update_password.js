const uniqid = require("uniqid");
const bcrypt = require("bcrypt");
const connection = require("../../../modules/db_connect");

module.exports = (email, password) => {
	return (new Promise(async (resolve, reject) => {
		const session_id = uniqid();
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);
		const query = "UPDATE user SET session_id = ?, password = ? WHERE email = ?";
		connection.query(query, [ session_id, hashedPassword, email ], (error, result) => {
			return (error ? reject({code: 500, message: "Error when updating the user password"}) : resolve(result));
		});
	}));
}