const connection = require("../../../modules/db_connect");

function get_user_by_session_id(session_id) {
	return (new Promise((resolve, reject) => {
		const query = "SELECT id, session_id, username, email, password, level FROM user WHERE session_id = ?";
		connection.query(query, [ session_id ], (error, result) => {
			return (error ? reject({code: 500, message: "Error when fetching the user"}) : resolve(result[0]));
		});
	}));
}

function get_user_by_username(username) {
	return (new Promise((resolve, reject) => {
		const query = "SELECT id, session_id, username, email, password, level FROM user WHERE username = ?";
		connection.query(query, [ username ], (error, result) => {
			return (error ? reject({code: 500, message: "Error when fetching the user"}) : resolve(result[0]));
		});
	}));
}

function get_user_by_email(email) {
	return (new Promise((resolve, reject) => {
		const query = "SELECT id, session_id, username, email, password, level FROM user WHERE email = ?";
		connection.query(query, [ email ], (error, result) => {
			return (error ? reject({code: 500, message: "Error when fetching the user"}) : resolve(result[0]));
		});
	}));
}

function get_all_users() {
	return (new Promise((resolve, reject) => {
		const query = "SELECT id, session_id, username, email, password, level FROM user";
		connection.query(query, (error, result) => {
			return (error ? reject({code: 500, message: "Error when fetching all users"}) : resolve(result));
		});
	}));
}

function cred_already_exists(username, email) {
	return (new Promise((resolve, reject) => {
		const query = "SELECT username, email FROM user WHERE username = ? OR email = ?";
		connection.query(query, [ username, email ], (error, result) => {
			return (error ? reject({code: 500, message: "Error when checking the credentials"}) : resolve(result.length != 0));
		});
	}));
}

module.exports = { get_user_by_username, get_user_by_email, get_user_by_session_id, get_all_users, cred_already_exists };