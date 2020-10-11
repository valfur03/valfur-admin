const connection = require("../../../modules/db_connect");

function get_projects() {
	return (new Promise((resolve, reject) => {
		let query = "SELECT id, title, url, DATE_FORMAT(start_date, '%Y-%m-%d') as start_date, DATE_FORMAT(end_date, '%Y-%m-%d') as end_date FROM project ORDER BY start_date ASC";
		connection.query(query, (error, result) => {
			return (error ? reject({code: 500, message: "Error when fetching all projects"}) : resolve(result));
		});
	}));
}

function get_project_by_id(id) {
	return (new Promise((resolve, reject) => {
		let query = "SELECT title, url, start_date, end_date FROM project WHERE id = ?";
		connection.query(query, [ id ], (error, result) => {
			return (error ? reject({code: 500, message: "Error when fetching project"}) : resolve(result));
		});
	}));
}

module.exports = { get_projects, get_project_by_id };