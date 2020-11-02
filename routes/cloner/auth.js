const router = require("express").Router();
const tfa = require("node-2fa");
const validate_url_params = require("./validation/auth");
const { get_cloner_config } = require("./query/get");

router.get("/", async (req, res) => {
	// Check the url params
	const { error } = validate_url_params(req.query);
	if (error) return (res.status(400).send({message: error.details[0].message}));
	// Get the token
	let config;
	try {
		config = await get_cloner_config();
		if (config.length == 0) return (res.status(500).send({message: "The TFA server isn't configured yet"}));
	} catch (error) {
		return (res.status(error.code).send({message: error.message}));
	}
	// Check the token
	const { token } = req.query;
	const verify = tfa.verifyToken(config.secret, token);
	if (!verify || verify.delta) return (res.status(400).send({message: "Invalid TFA token"}));
	return (res.send(config.url));
});

module.exports = router;