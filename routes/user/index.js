const router = require("express").Router();

const authRoute = require("./auth");
const passwordRoute = require("./password");
const manageRoute = require("./manage");
const permissionRoute = require("./permission");
const getRoute = require("./get");

router.use("/auth", authRoute);
router.use("/password", passwordRoute);
router.use("/manage", manageRoute);
router.use("/permission", permissionRoute);
router.use("/get", getRoute);

module.exports = router;