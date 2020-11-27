const router = require("express").Router();
const { enable_setting, disable_setting } = require("./query/manage");

router.post("/enable/:name", async (req, res) => {
	const { name } = req.params;
	// Enable the setting
	try {
		await enable_setting(name);
	} catch (error) {
		return (res.status(error.code).send({message: error.message}));
	}
	return (res.send({message: "Setting enabled"}));
});

router.post("/disable/:name", async (req, res) => {
	const { name } = req.params;
	// Disable the setting
	try {
		await disable_setting(name);
	} catch (error) {
		return (res.status(error.code).send({message: error.message}));
	}
	return (res.send({message: "Setting disabled"}));
});

module.exports = router;