const connection = require("./db_connect");
const Joi = require("joi");
const tz = require("timezone");
var eu = tz(require("timezone/Europe"))

function log_validation(data) {
	const schema = Joi.object({
		title: Joi.string().max(40).required(),
		text: Joi.string().required(),
		type: Joi.string().valid("log", "error").required()
	});
	return (schema.validate(data));
}

function add_log(title, text, type, datetime) {
	return (new Promise((resolve, reject) => {
		const query = "INSERT INTO log(title, text, type, date_time) VALUES(?, ?, ?, ?)";
		connection.query(query, [ title, text, type, datetime ], (error, result) => {
			return (error ? reject({code: 500, message: "Error when logging"}) : resolve(result));
		});
	}));
}

module.exports = async (title, text, type) => {
	// Get the current datetime
	const utc_date = new Date();
	const datetime = eu(utc_date, "%G-%m-%d %H:%M:%S", "fr_FR", process.env.TIME_ZONE);
	console.log(datetime);
	// Check the body
	const { error } = log_validation({title: title, text: text, type: type});
	if (error) return ({code: 400, message: error.details[0].message});
	try {
		await add_log(title, text, type, datetime);
	} catch (error) {
		return (error);
	}
	return ({code: 200, message: "Success"});
}