const connection = require("../../../modules/db_connect");

function get_works() {
	return (new Promise((resolve, reject) => {
		let query = "SELECT id, title, description, url FROM work ORDER BY id DESC";
		connection.query(query, (error, result) => {
			return (error ? reject({code: 500, message: "Error when fetching all works"}) : resolve(result));
		});
	}));
}

function get_work_by_id(id) {
	return (new Promise((resolve, reject) => {
		let query = "SELECT id, title, description, url FROM work WHERE id = ?";
		connection.query(query, [ id ], (error, result) => {
			return (error ? reject({code: 500, message: "Error when fetching work"}) : resolve(result));
		});
	}));
}

module.exports = { get_works, get_work_by_id };