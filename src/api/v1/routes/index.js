const router = require("express").Router();

router.use("/user", require("./user/User.routes"));

module.exports = router;
