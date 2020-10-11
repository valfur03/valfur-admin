const Joi = require("joi");

function manage_work_validation(data) {
	const schema = Joi.object({
		title: Joi.string().min(1).max(40).required(),
		description: Joi.string().min(1).max(80).required(),
		url: Joi.string().min(6).max(255).uri().required(),
	});
	return (schema.validate(data));
}

module.exports = { manage_work_validation };