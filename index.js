const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const schedule = require("node-schedule");
const app = express();
const cpu = require("./modules/cpu");
const data_log = require("./modules/log");

dotenv.config();
app.use(cors());

const apiRoute = require("./routes");
const warmupRoute = require("./warmup");

app.use(express.json());
app.use("/api", apiRoute);
app.use("/warmup", warmupRoute);

app.listen(3000, () => data_log("Server running", "The server started running, and everything is OK.", "log"));

schedule.scheduleJob("0 * * * * *", () => {
	cpu.log();
});