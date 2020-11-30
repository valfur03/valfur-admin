const connection = require("../../../modules/db_connect");

function clear_all(hours = 24) {
	return (new Promise((resolve, reject) => {
		let query = "DELETE FROM log WHERE date_time <= now() - interval ? HOUR";
		connection.query(query, [ hours ], (error, result) => {
			return (error ? reject({code: 500, message: "Error when deleting all logs"}) : resolve(result));
		});
	}));
}

function clear_logs(hours = 24) {
	return (new Promise((resolve, reject) => {
		let query = "DELETE FROM log WHERE (date_time <= now() - interval ? HOUR AND type = 'log') OR (date_time <= now() - interval ? HOUR AND type = 'error')";
		connection.query(query, [ hours ], (error, result) => {
			return (error ? reject({code: 500, message: "Error when deleting logs of type log"}) : resolve(result));
		});
	}));
}

module.exports = { clear_all, clear_logs };