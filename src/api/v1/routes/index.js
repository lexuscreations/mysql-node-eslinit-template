const router = require("express").Router();

router.use("/user", require("./Panel_users.routes"));
router.use("/role", require("./Panel_roles.routes"));
router.use("/task", require("./Panel_tasks.routes"));

module.exports = router;