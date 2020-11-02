const connection = require("../../../modules/db_connect");

function add_cloner(data) {
	return (new Promise((resolve, reject) => {
		const { url, secret } = data;
		const query = "INSERT INTO cloner(url, secret) VALUES(?, ?)";
		connection.query(query, [ url, secret ], (error, result) => {
			return (error ? reject({code: 500, message: "Error when adding the cloner config"}) : resolve(result));
		});
	}));
}

function patch_url(url) {
	return (new Promise((resolve, reject) => {
		const query = "UPDATE cloner SET url = ? ORDER BY id DESC LIMIT 1";
		connection.query(query, [ url ], (error, result) => {
			return (error ? reject({code: 500, message: "Error when patching the cloner config url"}) : resolve(result));
		});
	}));
}

module.exports = { add_cloner, patch_url };