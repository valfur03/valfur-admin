const connection = require("../../../modules/db_connect");

function get_settings() {
	return (new Promise((resolve, reject) => {
		const query = "SELECT name, value FROM setting";
		connection.query(query, (error, result) => {
			return (error ? reject({code: 500, message: "Error when fetching all settings"}) : resolve(result));
		});
	}));
}

function get_settings_by_name(name) {
	return (new Promise((resolve, reject) => {
		const query = "SELECT name, value FROM setting WHERE name = ?";
		connection.query(query, [ name ], (error, result) => {
			return (error ? reject({code: 500, message: "Error when fetching setting"}) : resolve(result));
		});
	}));
}

module.exports = { get_settings, get_settings_by_name };