const { uploadPath, showDevLogs } = require(`${global.rootDirPath}config\\appConfig`);
const db = require("../../models");

const User = db.users;

const addUser = async(req, res) => {
    const {
        username,
        personalMobileNumber,
        whatsAppNumber,
        personalEmailAddress,
        designation,
        reportingTo,
        officeLocation,
        department
    } = req.body;

    const files = [];
    req.files.forEach((file) => {
        if (showDevLogs) console.log('routes/upload.routes.js:23->router.post("/")', file);
        files.push(uploadPath + file.filename);
    });
    const userDATA = {
        profileImage: files[0],
        username,
        personalMobileNumber,
        whatsAppNumber,
        personalEmailAddress,
        designation,
        reportingTo,
        officeLocation,
        department
    };

    try {
        const user = await User.create(userDATA);
        res.status(200).json({
            isError: false,
            message: "Success",
            data: user
        });
    } catch (error) {
        const { message } = error && error.errors && error.errors[0] ? error.errors[0] : error;
        res.status(422).json({
            isError: false,
            message,
            data: []
        });
    }
};

module.exports = {
    addUser
};