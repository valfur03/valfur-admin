const connection = require("../../../modules/db_connect");

function add_project(data) {
	return (new Promise((resolve, reject) => {
		const { title, url, start_date, end_date } = data;
		const query = "INSERT INTO project(title, url, start_date, end_date) VALUES(?, ?, ?, ?)";
		connection.query(query, [ title, url, start_date, end_date ], (error, result) => {
			return (error ? reject({code: 500, message: "Error when adding the project"}) : resolve(result));
		});
	}));
}

function edit_project(id, data) {
	return (new Promise((resolve, reject) => {
		const { title, url, start_date, end_date } = data;
		const query = "UPDATE project SET title = ?, url = ?, start_date = ?, end_date = ? WHERE id = ?";
		connection.query(query, [ title, url, start_date, end_date, id ], (error, result) => {
			return (error ? reject({code: 500, message: "Error when editing the project"}) : resolve(result));
		});
	}));
}

function delete_project(id) {
	return (new Promise((resolve, reject) => {
		const query = "DELETE FROM project WHERE id = ?";
		connection.query(query, [ id ], (error, result) => {
			return (error ? reject({code: 500, message: "Error when deleting the project"}) : resolve(result));
		});
	}));
}

module.exports = { add_project, edit_project, delete_project };