const router = require("express").Router();
const verify_token = require("../../modules/verify_token");
const { manage_work_validation } = require("./validation/manage");
const { add_work, edit_work, delete_work } = require("./query/manage");

router.post("/", verify_token(2), async (req, res) => {
	//	Check the body
	const { error } = manage_work_validation(req.body);
	if (error) return (res.status(400).send({message: error.details[0].message}));
	//	Add the work to the database
	try {
		await add_work(req.body);
	} catch (error) {
		return (res.status(error.code).send({message: error.message}));
	}
	return (res.send({message: "Work added"}));
});

router.put("/:id", verify_token(2), async (req, res) => {
	//	Check the body
	const { error } = manage_work_validation(req.body);
	if (error) return (res.status(400).send({message: error.details[0].message}));
	//	Add the work to the database
	const { id } = req.params;
	try {
		const result = await edit_work(id, req.body);
		if (result.affectedRows == 0) return (res.status(404).send({message: "Work not found"}));
	} catch (error) {
		return (res.status(error.code).send({message: error.message}));
	}
	return (res.send({message: "Work updated"}));
});

router.delete("/:id", verify_token(2), async (req, res) => {
	//	Delete the work from the database
	const { id } = req.params;
	try {
		const result = await delete_work(id);
		if (result.affectedRows == 0) return (res.status(404).send({message: "Work not found"}));
	} catch (error) {
		return (res.status(error.code).send({message: error.message}));
	}
	return (res.send({message: "Work deleted"}));
});

module.exports = router;