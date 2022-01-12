const router = require("express").Router();
const { userControllers } = require("../../controllers");

const getall = (req, res) => {
    res.send("Get Running");
};

const getbyid = (req, res) => {
    const { userId } = req.params;
    res.send(`userid is: ${userId}`);
};

const update = (req, res) => {
    res.send("User update successfully");
};

const remove = (req, res) => {
    res.send("remove Running");
};

router.route("/getall").get(getall);
router.route("/getbyid/:userid").get(getbyid);
router.route("/create").post((req, res, next) => {
    console.log("multer.upload,middleware.implementation.pending");
    next();
}, userControllers.addUser);
router.route("/update").put(update);
router.route("/remove").delete(remove);

module.exports = router;