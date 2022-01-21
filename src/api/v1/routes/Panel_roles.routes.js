const router = require("express").Router();
const { rolesControllers } = require("../controllers");
const { multer } = require("../middlewares");

router.route("/getlist").get(rolesControllers.getListRoles);
router.route("/getbyid/:roleId").get(rolesControllers.getById);
router.route("/search").post(rolesControllers.roleSearch);
router.route("/create").post(multer, rolesControllers.addRole);
router.route("/update").put(rolesControllers.updateRole);
router.route("/remove").delete(rolesControllers.removeRole);

module.exports = router;