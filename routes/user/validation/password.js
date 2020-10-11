const Joi = require("joi");

function forgot_pass_validation(data) {
	const schema = Joi.object({
		email: Joi.string().min(5).max(255).email().required()
	});
	return (schema.validate(data));
}

function new_pass_validation(data) {
	const schema = Joi.object({
		token: Joi.string().required(),
		password: Joi.string().min(6).max(60).required(),
		confirmPassword: Joi.string().min(6).max(60).required()
	});
	return (schema.validate(data));
}

module.exports = { forgot_pass_validation, new_pass_validation };