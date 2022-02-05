const router = require("express").Router();
const {
 tasksControllers
} = require("../controllers");

router.route("/create").post(tasksControllers.addTask);
router.route("/getlist").get(tasksControllers.getListTasks);
router.route("/getbyid/:taskId").get(tasksControllers.getById);
router.route("/search").post(tasksControllers.taskSearch);
router.route("/update").put(tasksControllers.updateTask);
router.route("/remove").patch(tasksControllers.removeTask);

module.exports = router;
