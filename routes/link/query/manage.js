const connection = require("../../../modules/db_connect");

function add_link(data) {
	return (new Promise((resolve, reject) => {
		const { text, url } = data;
		const query = "INSERT INTO link(text, url) VALUES(?, ?)";
		connection.query(query, [ text, url ], (error, result) => {
			return (error ? reject({code: 500, message: "Error when adding the link"}) : resolve(result));
		});
	}));
}

function edit_link(id, data) {
	return (new Promise((resolve, reject) => {
		const { text, url } = data;
		const query = "UPDATE link SET text = ?, url = ? WHERE id = ?";
		connection.query(query, [ text, url, id ], (error, result) => {
			return (error ? reject({code: 500, message: "Error when editing the link"}) : resolve(result));
		});
	}));
}

function delete_link(id) {
	return (new Promise((resolve, reject) => {
		const query = "DELETE FROM link WHERE id = ?";
		connection.query(query, [ id ], (error, result) => {
			return (error ? reject({code: 500, message: "Error when deleting the link"}) : resolve(result));
		});
	}));
}

module.exports = { add_link, edit_link, delete_link };