const router = require("express").Router();
const { userControllers } = require("../../controllers");
const { multer } = require("../../middlewares");

router.route("/getall").post(userControllers.getAllUsers);
router.route("/getbyid/:userId").get(userControllers.getById);
router.route("/search").post(userControllers.userSearch);
router.route("/create").post(multer, userControllers.addUser);
router.route("/update").put(userControllers.updateUser);
router.route("/remove").delete(userControllers.removeUser);

module.exports = router;