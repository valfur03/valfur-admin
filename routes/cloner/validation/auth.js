const Joi = require("joi")

module.exports = function (params) {
	const schema = Joi.object({
		token: Joi.string().required()
	});
	return (schema.validate(params));
}