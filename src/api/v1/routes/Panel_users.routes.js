const router = require("express").Router();
const {
 userControllers
} = require("../controllers");
const {
 multer
} = require("../middlewares");

router.route("/create").post(multer, userControllers.addUser);
router.route("/getlist").get(userControllers.getListUsers);
router.route("/getbyid/:userId").get(userControllers.getById);
router.route("/search").post(userControllers.userSearch);
router.route("/update").put(userControllers.updateUser);
router.route("/remove").patch(userControllers.removeUser);

module.exports = router;
