const connection = require("../../../modules/db_connect");

function get_cloner_config() {
	return (new Promise((resolve, reject) => {
		let query = "SELECT url, secret FROM cloner ORDER BY id DESC LIMIT 1";
		connection.query(query, (error, result) => {
			return (error ? reject({code: 500, message: "Error when fetching the cloner config"}) : resolve(result[0]));
		});
	}));
}

module.exports = { get_cloner_config };