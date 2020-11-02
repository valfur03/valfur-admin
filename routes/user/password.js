const router = require("express").Router();
const jwt = require("jsonwebtoken");
const { forgot_pass_validation, new_pass_validation } = require("./validation/password");
const { get_user_by_email } = require("./query/get_user");
const transporter = require("../../modules/email_connect");
const update_password = require("./query/update_password");
const { password } = require("../../email_template");

router.post("/forgot", async (req, res) => {
	//	Check the body
	const { error } = forgot_pass_validation(req.body);
	if (error) return (res.status(400).send({message: error.details[0].message}));
	const { email } = req.body;
	//	Get the user data
	try {
		dbUser = await get_user_by_email(email);
		if (!dbUser) return (res.status(400).send({message: "Email not registered"}));
	} catch (error) {
		return (res.status(error.code).send({message: error.message}));
	}
	//	Create the token
	const token = jwt.sign({session_id: dbUser.session_id, email: email}, process.env.TOKEN_SECRET, {expiresIn: "1d"});
	//	Send the token by email
	try {
		transporter.sendMail(password(email, token));
	} catch (error) {
		return (res.status(500).send({message: "Error when sending the email"}));
	}
	return (res.send({message: "Email sent"}));
});

router.post("/new", async (req, res) => {
	//	Check the body
	const { error } = new_pass_validation(req.body);
	if (error) return (res.status(400).send({message: error.details[0].message}));
	const { token, password, confirmPassword } = req.body;
	//	Check if passwords are the same
	if (password != confirmPassword) return (res.status(400).send({message: "Both passwords must be the same"}));
	//	Get the token data
	var verified;
	try {
		verified = jwt.verify(token, process.env.TOKEN_SECRET);
	} catch {
		res.status(400).send({message: "Invalid token"});
	}
	const { session_id, email } = verified;
	//	Check if the session ids are the same
	try {
		const dbUser = await get_user_by_email(email);
		if (!dbUser) return (res.status(400).send({message: "Email not registered"}));
		if (session_id != dbUser.session_id) return (res.status(400).send({message: "Password can't be changed"}));
	} catch (error) {
		return (res.status(error.code).send({message: error.message}));
	}
	//	Update the password
	try {
		await update_password(email, password);
	} catch (error) {
		return (res.status(error.code).send({message: error.message}));
	}
	return (res.send({message: "Password updated"}));
});

module.exports = router;