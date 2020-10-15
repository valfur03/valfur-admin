const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const http = require("http");
const schedule = require("node-schedule");
const app = express();
const data_log = require("./modules/log");

dotenv.config();
app.use(cors());

const apiRoute = require("./routes");
const warmupRoute = require("./warmup");

app.use(express.json());
app.use("/api", apiRoute);
app.use("/warmup", warmupRoute);

app.listen(3000, () => data_log("Server running", "The server started running, and everything is OK.", "log"));

schedule.scheduleJob("0 */5 * * * *", (date) => {
	try {
		http.request({host: "localhost", path: "/warmup"}, (response) => {
			response.on("data", (chunk) => {});
			response.on("end", () => {
				data_log("Warm up", "Server warmed up, and everything is OK.", "log");
			})
		}).end();
	} catch (error) {
		data_log("Error when warming up the server", error, "error");
	}
});