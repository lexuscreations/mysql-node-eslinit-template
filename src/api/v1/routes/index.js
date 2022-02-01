const router = require("express").Router();

router.use("/uac/user", require("./Panel_users.routes"));
router.use("/uac/role", require("./Panel_roles.routes"));
router.use("/uac/task", require("./Panel_tasks.routes"));

module.exports = router;
