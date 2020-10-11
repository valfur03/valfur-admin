const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth_validation = require("./validation/auth");
const { get_user_by_username } = require("./query/get_user");
const verify_token = require("../../modules/verify_token");

router.post("/", async (req, res) => {
	//	Check the body
	const { error } = auth_validation(req.body);
	if (error) return (res.status(400).send({message: error.details[0].message}));
	const { username, password } = req.body;
	let dbUser;
	//	Get the user data
	try {
		dbUser = await get_user_by_username(username);
		if (!dbUser) return (res.status(400).send({message: "Wrong username or password"}));
	} catch (error) {
		return (res.status(error.code).send({message: error.message}));
	}
	//	Check if password is set
	if (dbUser.password == "0") return (res.status(409).send({message: "Password not set yet"}));
	//	Compare passwords
	const validPassword = await bcrypt.compare(password, dbUser.password);
	if (!validPassword) return (res.status(400).send({message: "Wrong username or password"}));
	//	Create the token
	const token = jwt.sign({session_id: dbUser.session_id}, process.env.TOKEN_SECRET, {expiresIn: "1d"});
	return (res.header("Authorization", token).send({token: token}));
});

router.post("/check", verify_token(), (req, res) => {
	return(res.send({message: "Logged in"}));
});

module.exports = router;