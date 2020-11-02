const router = require("express").Router();
const verify_token = require("../../modules/verify_token");
const { manage_cloner_validation } = require("./validation/manage");
const { add_cloner, patch_url } = require("./query/manage");
const { new_secret } = require("../../modules/2fa_secret");
const data_log = require("../../modules/log");

router.post("/", verify_token(2), async (req, res) => {
	//	Check the body
	const { error } = manage_cloner_validation(req.body);
	if (error) return (res.status(400).send({message: error.details[0].message}));
	//	Add the config to the database
	req.body.secret = new_secret().secret;
	try {
		await add_cloner(req.body);
	} catch (error) {
		return (res.status(error.code).send({message: error.message}));
	}
	data_log("New TFA code", "The server uses a new TFA code. You can request that it be sent to your email address.", "log")
	return (res.send({message: "Cloner config added"}));
});

router.put("/url", verify_token(2), async (req, res) => {
	//	Check the body
	const { error } = manage_cloner_validation(req.body);
	if (error) return (res.status(400).send({message: error.details[0].message}));
	//	Add the config to the database
	try {
		await patch_url(req.body.url);
	} catch (error) {
		return (res.status(error.code).send({message: error.message}));
	}
	return (res.send({message: "Cloner config url patched"}));
});

module.exports = router;