const connection = require("../../../modules/db_connect");

function add_work(data) {
	return (new Promise((resolve, reject) => {
		const { title, description, url } = data;
		const query = "INSERT INTO work(title, description, url) VALUES(?, ?, ?)";
		connection.query(query, [ title, description, url ], (error, result) => {
			return (error ? reject({code: 500, message: "Error when adding the work"}) : resolve(result));
		});
	}));
}

function edit_work(id, data) {
	return (new Promise((resolve, reject) => {
		const { title, description, url } = data;
		const query = "UPDATE work SET title = ?, description = ?, url = ? WHERE id = ?";
		connection.query(query, [ title, description, url, id ], (error, result) => {
			return (error ? reject({code: 500, message: "Error when editing the work"}) : resolve(result));
		});
	}));
}

function delete_work(id) {
	return (new Promise((resolve, reject) => {
		const query = "DELETE FROM work WHERE id = ?";
		connection.query(query, [ id ], (error, result) => {
			return (error ? reject({code: 500, message: "Error when deleting the work"}) : resolve(result));
		});
	}));
}

module.exports = { add_work, edit_work, delete_work };