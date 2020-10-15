const router = require("express").Router();

const getRoute = require("./get_log");

router.use("/get", getRoute);

module.exports = router;