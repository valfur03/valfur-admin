const connection = require("../../../modules/db_connect");

function get_logs(offset) {
	return (new Promise((resolve, reject) => {
		let query = "SELECT id, title, text, type, date_time FROM log ORDER BY date_time DESC LIMIT ?, 25";
		connection.query(query, [ offset ], (error, result) => {
			return (error ? reject({code: 500, message: "Error when fetching all logs"}) : resolve(result));
		});
	}));
}

module.exports = { get_logs };