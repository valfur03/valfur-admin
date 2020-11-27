const router = require("express").Router();
const { get_settings, get_settings_by_name } = require("./query/get_setting");

router.get("/all", async (req, res) => {
	// Get all settings from the database
	let settings_list;
	try {
		settings_list = await get_settings();
	} catch (error) {
		return (res.status(error.code).send(error.message));
	}
	// Check if list is empty
	if (settings_list.length == 0) return (res.status(404).send("No settings found"));
	// Group the list by setting's name
	let settings = {};
	settings_list.forEach(setting => {
		settings[setting.name] = { name: setting.name, value: setting.value };
	});
	return (res.send(settings));
});

router.get("/:name", async (req, res) => {
	const { name } = req.params;
	// Get all settings from the database
	let setting;
	try {
		setting = await get_settings_by_name(name);
	} catch (error) {
		return (res.status(error.code).send(error.message));
	}
	if (setting.length == 0) return (res.status(404).send("No setting found"));
	return (res.send(setting[0]));
});

module.exports = router;