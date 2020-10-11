const router = require("./manage");
const { get_projects, get_project_by_id } = require("./query/get_project");

router.get("/all", async (req, res) => {
	req.body = undefined;
	try {
		const projects = await get_projects();
		if (projects.length == 0) return (res.status(404).send({message: "No project found"}));
		return (res.send(projects));
	} catch (error) {
		return (res.status(error.code).send(error.message));
	}
});

router.get("/:id", async (req, res) => {
	const { id } = req.params;
	try {
		const project = await get_project_by_id(id);
		if (project.length == 0) return (res.status(404).send({message: "project not found"}));
		return (res.send(project));
	} catch (error) {
		return (res.status(error.code).send(error.message));
	}
});

module.exports = router;