const router = require("express").Router();
const { tasksControllers } = require("../controllers");
const { multer } = require("../middlewares");

router.route("/getlist").get(tasksControllers.getListRoles);
router.route("/getbyid/:roleId").get(tasksControllers.getById);
router.route("/search").post(tasksControllers.taskSearch);
router.route("/create").post(multer, tasksControllers.addTask);
router.route("/update").put(tasksControllers.updateTask);
router.route("/remove").delete(tasksControllers.removeTask);

module.exports = router;