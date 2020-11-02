const router = require("express").Router();

const manageRoute = require("./manage");
const getRoute = require("./get");
const authRoute = require("./auth");

router.use("/manage", manageRoute);
router.use("/get", getRoute);
router.use("/auth", authRoute);

module.exports = router;