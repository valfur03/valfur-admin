const router = require("./manage");
const { get_links, get_link_by_id } = require("./query/get_link");

router.get("/all", async (req, res) => {
	req.body = undefined;
	try {
		const links = await get_links();
		if (links.length == 0) return (res.status(404).send({message: "No link found"}));
		return (res.send(links));
	} catch (error) {
		return (res.status(error.code).send({message: error.message}));
	}
});

router.get("/:id", async (req, res) => {
	const { id } = req.params;
	try {
		const link = await get_link_by_id(id);
		if (link.length == 0) return (res.status(404).send({message: "Link not found"}));
		return (res.send(link));
	} catch (error) {
		return (res.status(error.code).send({message: error.message}));
	}
});

module.exports = router;