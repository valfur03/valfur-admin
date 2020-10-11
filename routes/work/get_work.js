const router = require("./manage");
const { get_works, get_work_by_id } = require("./query/get_work");

router.get("/all", async (req, res) => {
	req.body = undefined;
	try {
		const works = await get_works();
		if (works.length == 0) return (res.status(404).send({message: "No work found"}));
		return (res.send(works));
	} catch (error) {
		return (res.status(error.code).send(error.message));
	}
});

router.get("/:id", async (req, res) => {
	const { id } = req.params;
	try {
		const work = await get_work_by_id(id);
		if (work.length == 0) return (res.status(404).send({message: "Work not found"}));
		return (res.send(work));
	} catch (error) {
		return (res.status(error.code).send(error.message));
	}
});

module.exports = router;