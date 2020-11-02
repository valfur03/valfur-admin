const router = require("express").Router();
const { verify } = require("jsonwebtoken");
const verify_token = require("../../modules/verify_token");
const { get_cloner_config } = require("./query/get");
const transporter = require("../../modules/email_connect");
const { tfa_code } = require("../../email_template");

router.get("/latest", verify_token(3), async (req, res) => {
	req.body = undefined;
	try {
		const config = await get_cloner_config();
		if (config.length == 0) return (res.status(404).send({message: "No config found"}));
		return (res.send(config));
	} catch (error) {
		return (res.status(error.code).send({message: error.message}));
	}
});

router.get("/code", verify_token(3), async (req, res) => {
	req.body = undefined;
	try {
		const config = await get_cloner_config();
		if (config.length == 0) return (res.status(404).send({message: "No config found"}));
		try {
			transporter.sendMail(tfa_code(req.user.email, config.secret));
		} catch (error) {
			return (res.status(500).send({message: "Error when sending the email"}));
		}
		return (res.send({message: "Email sent"}));
	} catch (error) {
		return (res.status(error.code).send({message: error.message}));
	}
});

module.exports = router;