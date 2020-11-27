const connection = require("./db_connect");
const data_log = require("./log");

function fetch_settings() {
	return (new Promise((resolve, reject) => {
		const query = "SELECT name, value FROM setting";
		connection.query(query, (error, result) => {
			return (error ? reject(error) : resolve(result));
		});
	}));
}

function disable(name) {
	return (new Promise((resolve, reject) => {
		const query = "UPDATE setting SET value = 0 WHERE name = ?";
		connection.query(query, [ name ], (error, result) => {
			if (result.affectedRows == 0) return (reject({code: 404, message: "Setting not found"}));
			return (error ? reject({code: 500, message: "Error when disabling the setting"}) : resolve(result));
		});
	}));
}

async function get_all() {
	// Get all settings from the database
	let settings_list;
	try {
		settings_list = await fetch_settings();
	} catch (error) {
		data_log("Error when fetching settings", `The settings couldn't not be fetched for the following reason:\n${error}`, "error");
		return ({});
	}
	let settings = {};
	settings_list.forEach(setting => {
		settings[setting.name] = setting.value;
	});
	return (settings);
}

async function disable_setting(name) {
	// Disable the setting
	try {
		await disable(name);
	} catch (error) {
		console.log(error);
	}
}

module.exports = { get_all, disable_setting };