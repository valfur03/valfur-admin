const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const http = require("http");
const schedule = require("node-schedule");
const app = express();

dotenv.config();
app.use(cors());

const apiRoute = require("./routes");
const initRoute = require("./init_db");
const warmupRoute = require("./warmup");

app.use(express.json());
app.use("/api", apiRoute);
app.use("/init", initRoute);
app.use("/warmup", warmupRoute);

app.listen(3000, () => console.log("Server running"));

schedule.scheduleJob("0 */5 * * * *", (date) => {
	try {
		http.request({host: "localhost", path: "/warmup"}, (response) => {
			response.on("data", (chunk) => {
				console.log(`[${date}] : Server warmed up`);
			});
			response.on("end", () => {
				console.log("Request ended");
			})
		}).end();
	} catch (error) {
		console.error(error);
	}
});