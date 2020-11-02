const Joi = require("joi");

function manage_cloner_validation(data) {
	const schema = Joi.object({
		url: Joi.string().min(6).max(255).uri().required()
	});
	return (schema.validate(data));
}

module.exports = { manage_cloner_validation };