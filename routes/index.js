const router = require("express").Router();

const userRoute = require("./user");
const workRoute = require("./work");
const linkRoute = require("./link");
const projectRoute = require("./project");

router.use("/user", userRoute);
router.use("/work", workRoute);
router.use("/link", linkRoute);
router.use("/project", projectRoute);

module.exports = router;