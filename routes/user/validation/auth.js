const Joi = require("joi");

module.exports = (data) => {
	const schema = Joi.object({
		username: Joi.string().min(3).max(30).required(),
		password: Joi.string().min(6).max(60).required()
	});
	return (schema.validate(data));
};