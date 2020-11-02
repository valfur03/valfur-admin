const router = require("express").Router();
const uniqid = require("uniqid");
const jwt = require("jsonwebtoken");
const verify_token = require("../../modules/verify_token");
const { add_user_validation, edit_user_validation } = require("./validation/manage");
const { cred_already_exists, get_user_by_username } = require("./query/get_user");
const { add_user, update_username, delete_user } = require("./query/manage");
const transporter = require("../../modules/email_connect");
const get_user = require("./query/get_user");
const { password } = require("../../email_template");

router.post("/", verify_token(1), async (req, res) => {
	//	Check the body
	const { error } = add_user_validation(req.body);
	if (error) return (res.status(400).send({message: error.details[0].message}));
	//	Check if the created user is not under the creator
	if (req.user.level >= req.body.level) return (res.status(403).send({message: "Can't create user with higher or same level than you"}));
	const user = {
		session_id: uniqid(),
		username: req.body.username,
		email: req.body.email,
		level: req.body.level
	};
	//	Check if the credentials already exist
	try {
		const exists = await cred_already_exists(user.username, user.email);
		if (exists) return (res.status(400).send({message: "Username or email already exists"}));
	} catch (error) {
		return (res.status(error.code).send({message: error.message}));
	}
	//	Add the user to the database
	try {
		await add_user(user);
	} catch (error) {
		return (res.status(error.code).send({message: error.message}));
	}
	//	Send the mail to set the password
	const token = jwt.sign({session_id: user.session_id, email: user.email}, process.env.TOKEN_SECRET, {expiresIn: "1d"});
	try {
		transporter.sendMail(email_template(email, token));
	} catch (error) {
		return (res.status(500).send({message: "Error when sending the email"}));
	}
	return (res.send({message: "User added"}));
});

router.put("/:username", verify_token(2), async (req, res) => {
	//	Check if the user is edited by himself
	const { username } = req.params;
	if (req.user.username != username && req.user.level != 0) return (res.status(403).send({message: "Can't edit this user"}));
	//	Check the body
	const { error } = edit_user_validation(req.body);
	if (error) return (res.status(400).send({message: error.details[0].message}));
	//	Create the user
	const user = {
		session_id: uniqid(),
		username: req.body.username
	};
	//	Check if the credentials already exist
	try {
		const exists = await cred_already_exists(user.username, undefined);
		if (exists && user.username != req.user.username) return (res.status(400).send({message: "Username already exists"}));
	} catch (error) {
		return (res.status(error.code).send({message: error.message}));
	}
	//	Edit the user in the database
	try {
		await update_username(username, user);
	} catch (error) {
		return (res.status(error.code).send({message: error.message}));
	}
	return (res.send({message: "User updated"}));
});

router.delete("/:username", verify_token(2), async (req, res) => {
	//	Get the user data
	const { username } = req.params;
	var dbUser;
	try {
		dbUser = await get_user_by_username(username);
		if (!dbUser) return (res.status(404).send({message: "User not found"}));
	} catch (error) {
		return (res.status(error.code).send({message: error.message}));
	}
	if (req.user.username != username && req.user.level >= dbUser.level) return (res.status(403).send({message: "Can't delete this user"}));
	if (dbUser.level == 0) return (res.status(403).send({message: "Can't delete the master user"}));
	//	Delete the user from the database
	try {
		await delete_user(username);
	} catch (error) {
		return (res.status(error.code).send({message: error.message}));
	}
	return (res.send({message: "User deleted"}));
});

module.exports = router;