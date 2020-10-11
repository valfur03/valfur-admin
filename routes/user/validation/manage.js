const Joi = require("joi");

function add_user_validation(data) {
	const schema = Joi.object({
		username: Joi.string().min(3).max(30).required(),
		email: Joi.string().min(5).max(255).email().required(),
		level: Joi.number().integer().min(0).max(3).required()
	});
	return (schema.validate(data));
}

function edit_user_validation(data) {
	const schema = Joi.object({
		username: Joi.string().min(3).max(30).required()
	});
	return (schema.validate(data));
}

module.exports = { add_user_validation, edit_user_validation };