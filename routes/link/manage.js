const router = require("express").Router();
const verify_token = require("../../modules/verify_token");
const { manage_link_validation } = require("./validation/manage");
const { add_link, edit_link, delete_link } = require("./query/manage");

router.post("/", verify_token(2), async (req, res) => {
	//	Check the body
	const { error } = manage_link_validation(req.body);
	if (error) return (res.status(400).send({message: error.details[0].message}));
	//	Add the link to the database
	try {
		await add_link(req.body);
	} catch (error) {
		return (res.status(error.code).send({message: error.message}));
	}
	return (res.send({message: "Link added"}));
});

router.put("/:id", verify_token(2), async (req, res) => {
	//	Check the body
	const { error } = manage_link_validation(req.body);
	if (error) return (res.status(400).send({message: error.details[0].message}));
	//	Add the link to the database
	const { id } = req.params;
	try {
		const result = await edit_link(id, req.body);
		if (result.affectedRows == 0) return (res.status(404).send({message: "Link not found"}));
	} catch (error) {
		return (res.status(error.code).send({message: error.message}));
	}
	return (res.send({message: "Link updated"}));
});

router.delete("/:id", verify_token(2), async (req, res) => {
	//	Delete the link from the database
	const { id } = req.params;
	try {
		const result = await delete_link(id);
		if (result.affectedRows == 0) return (res.status(404).send({message: "Link not found"}));
	} catch (error) {
		return (res.status(error.code).send({message: error.message}));
	}
	return (res.send({message: "Link deleted"}));
});

module.exports = router;