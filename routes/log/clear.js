const router = require("express").Router();
const verify_token = require("../../modules/verify_token");
const { clear_all, clear_logs } = require("./query/clear");

router.delete("/all", verify_token(0), async (req, res) => {
	req.body = undefined;
	try {
		await clear_all();
	} catch (error) {
		return (res.status(error.code).send({message: error.message}));
	}
	res.send("Success");
});

router.delete("/logs", verify_token(0), async (req, res) => {
	req.body = undefined;
	try {
		await clear_logs();
	} catch (error) {
		return (res.status(error.code).send({message: error.message}));
	}
	res.send("Success");
});

module.exports = router;