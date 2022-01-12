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

    const profileImage = req.file.path;
    const userDATA = {
        profileImage,
        username,
        personalMobileNumber,
        whatsAppNumber,
        personalEmailAddress,
        designation,
        reportingTo,
        officeLocation,
        department
    };

    const user = await User.create(userDATA);
    res.status(200).send(user);
    console.log(user);
};

module.exports = {
    addUser
};