const connection = require("../../../modules/db_connect");

function enable_setting(name) {
	return (new Promise((resolve, reject) => {
		const query = "UPDATE setting SET value = 1 WHERE name = ?";
		connection.query(query, [ name ], (error, result) => {
			if (result.affectedRows == 0) return (reject({code: 404, message: "Setting not found"}));
			return (error ? reject({code: 500, message: "Error when enabling the setting"}) : resolve(result));
		});
	}));
}

function disable_setting(name) {
	return (new Promise((resolve, reject) => {
		const query = "UPDATE setting SET value = 0 WHERE name = ?";
		connection.query(query, [ name ], (error, result) => {
			if (result.affectedRows == 0) return (reject({code: 404, message: "Setting not found"}));
			return (error ? reject({code: 500, message: "Error when disabling the setting"}) : resolve(result));
		});
	}));
}

module.exports = { enable_setting, disable_setting };