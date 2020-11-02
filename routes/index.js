const router = require("express").Router();

const userRoute = require("./user");
const workRoute = require("./work");
const linkRoute = require("./link");
const projectRoute = require("./project");
const logRoute = require("./log");
const clonerRoute = require("./cloner");

router.use("/user", userRoute);
router.use("/work", workRoute);
router.use("/link", linkRoute);
router.use("/project", projectRoute);
router.use("/log", logRoute);
router.use("/cloner", clonerRoute);

module.exports = router;