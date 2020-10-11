const Joi = require("joi");

function edit_level_validation(data) {
	const schema = Joi.object({
		level: Joi.number().integer().min(0).max(2).required()
	});
	return (schema.validate(data));
}

module.exports = { edit_level_validation };