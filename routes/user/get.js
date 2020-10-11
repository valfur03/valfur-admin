const { verify } = require("jsonwebtoken");
const verify_token = require("../../modules/verify_token");

const router = require("express").Router();
const { get_all_users } = require("./query/get_user");

router.get("/all", verify_token(), async (req, res) => {
	try {
		const users = await get_all_users();
		return (res.send(users));
	} catch (error) {
		return (res.status(error.code).send({message: error.message}));
	}
});

module.exports = router;