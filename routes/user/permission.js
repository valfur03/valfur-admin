const router = require("express").Router();
const verify_token = require("../../modules/verify_token");
const { edit_level_validation } = require("./validation/permission");
const { get_user_by_username } = require("./query/get_user");
const { change_level } = require("./query/permission");

router.patch("/:username", verify_token(1), async (req, res) => {
	//	Check the body
	const { error } = edit_level_validation(req.body);
	if (error) return (res.status(400).send({message: error.details[0].message}));
	const { level } = req.body;
	//	Get the user data
	const { username } = req.params;
	var dbUser;
	try {
		dbUser = await get_user_by_username(username);
		if (!dbUser) return (res.status(404).send({message: "Username not registered"}));
	} catch (error) {
		return (res.status(error.code).send({message: error.message}));
	}
	if (req.user.username == username) return (res.status(403).send({message: "Can't change your own level"}));
	if (req.user.level >= level) return (res.status(400).send({message: "Can't edit user's level with higher or same than you"}));
	//	Edit the user's level in the database
	try {
		await change_level(username, level);
	} catch (error) {
		return (res.status(error.code).send({message: error.message}));
	}
	return (res.send({message: "Level updated"}));
});

module.exports = router;