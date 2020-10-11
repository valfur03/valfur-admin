const base_joi = require("joi");
const joi_extension = require('@hapi/joi-date');
const Joi = base_joi.extend(joi_extension);

function manage_project_validation(data) {
	const schema = Joi.object({
		title: Joi.string().min(1).max(40).required(),
		url: Joi.string().min(6).max(255).uri().required(),
		start_date: Joi.date().format("YYYY-MM-DD").raw(),
		end_date: Joi.date().format("YYYY-MM-DD").raw()
	});
	return (schema.validate(data));
}

module.exports = { manage_project_validation };