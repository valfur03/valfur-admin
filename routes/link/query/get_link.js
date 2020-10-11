const connection = require("../../../modules/db_connect");

function get_links() {
	return (new Promise((resolve, reject) => {
		let query = "SELECT id, text, url FROM link ORDER BY id ASC";
		connection.query(query, (error, result) => {
			return (error ? reject({code: 500, message: "Error when fetching all links"}) : resolve(result));
		});
	}));
}

function get_link_by_id(id) {
	return (new Promise((resolve, reject) => {
		let query = "SELECT id, text, url FROM link WHERE id = ?";
		connection.query(query, [ id ], (error, result) => {
			return (error ? reject({code: 500, message: "Error when fetching link"}) : resolve(result));
		});
	}));
}

module.exports = { get_links, get_link_by_id };