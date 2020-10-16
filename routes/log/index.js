const router = require("express").Router();

const getRoute = require("./get_log");
const clearRoute = require("./clear");

router.use("/get", getRoute);
router.use("/clear", clearRoute);

module.exports = router;