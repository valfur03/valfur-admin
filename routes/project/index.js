const router = require("express").Router();

const manageRoute = require("./manage");
const getRoute = require("./get_project");

router.use("/manage", manageRoute);
router.use("/get", getRoute);

module.exports = router;