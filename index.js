const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
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