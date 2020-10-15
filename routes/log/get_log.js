const router = require("express").Router();
const { get_logs } = require("./query/get_log");

router.get("/all", async (req, res) => {
	req.body = undefined;
	const offset = req.query.offset ? req.query.offset : 0;
	try {
		const logs = await get_logs(offset);
		if (logs.length == 0) return (res.status(404).send({message: "No log found"}));
		return (res.send(logs));
	} catch (error) {
		return (res.status(error.code).send({message: error.message}));
	}
});

module.exports = router;