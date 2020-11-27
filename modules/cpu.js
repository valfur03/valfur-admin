const si = require("systeminformation");
const { get_all, disable_setting } = require("./settings");
const data_log = require("./log");

async function log() {
	let settings;
	try {
		settings = await get_all();
	} catch (error) {
		return (console.log(error));
	}
	if (settings.log_cpu) {
		si.cpuTemperature((data) => {
			if (data.main == -1) {
				disable_setting("log_cpu");
				data_log("CPU Temperature unsupported", "The CPU Temperature logging is unsupported by your system. This feature is now disabled.", "error");
			} else {
				data_log("CPU Temperature", `The current temperature of the CPU is ${data.main}`, "log");
			}
		});
	}
}

module.exports = { log };