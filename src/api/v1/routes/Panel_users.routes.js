const router = require("express").Router();
const {
 userControllers
} = require("../controllers");

router.route("/create").post(userControllers.addUser);
router.route("/getlist").get(userControllers.getListUsers);
router.route("/getbyid/:userId").get(userControllers.getById);
router.route("/search").post(userControllers.userSearch);
router.route("/update").put(userControllers.updateUser);
router.route("/remove").patch(userControllers.removeUser);

module.exports = router;
