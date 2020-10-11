const Joi = require("joi");

function manage_link_validation(data) {
	const schema = Joi.object({
		text: Joi.string().min(1).required(),
		url: Joi.string().min(6).max(255).uri().required(),
	});
	return (schema.validate(data));
}

module.exports = { manage_link_validation };