const router = require("express").Router();
const verify_token = require("../../modules/verify_token");
const { manage_project_validation } = require("./validation/manage");
const { add_project, edit_project, delete_project } = require("./query/manage");

router.post("/", verify_token(2), async (req, res) => {
	//	Check the body
	const { error } = manage_project_validation(req.body);
	if (error) return (res.status(400).send({message: error.details[0].message}));
	//	Add the project to the database
	try {
		await add_project(req.body);
	} catch (error) {
		return (res.status(error.code).send({message: error.message}));
	}
	return (res.send({message: "Project added"}));
});

router.put("/:id", verify_token(2), async (req, res) => {
	//	Check the body
	const { error } = manage_project_validation(req.body);
	if (error) return (res.status(400).send({message: error.details[0].message}));
	//	Add the project to the database
	const { id } = req.params;
	try {
		const result = await edit_project(id, req.body);
		if (result.affectedRows == 0) return (res.status(404).send({message: "Project not found"}));
	} catch (error) {
		return (res.status(error.code).send({message: error.message}));
	}
	return (res.send({message: "Project updated"}));
});

router.delete("/:id", verify_token(2), async (req, res) => {
	//	Delete the project from the database
	const { id } = req.params;
	try {
		const result = await delete_project(id);
		if (result.affectedRows == 0) return (res.status(404).send({message: "Project not found"}));
	} catch (error) {
		return (res.status(error.code).send({message: error.message}));
	}
	return (res.send({message: "Project deleted"}));
});

module.exports = router;