const router = require("express").Router();
const {
 rolesControllers
} = require("../controllers");

router.route("/create").post(rolesControllers.addRole);
router.route("/getlist").get(rolesControllers.getListRoles);
router.route("/getbyid/:roleId").get(rolesControllers.getById);
router.route("/search").post(rolesControllers.roleSearch);
router.route("/update").put(rolesControllers.updateRole);
router.route("/remove").patch(rolesControllers.removeRole);

module.exports = router;
