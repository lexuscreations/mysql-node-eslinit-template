const multer = require("multer");

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, callback) => {
            callback(null, `${global.rootDirPath}public/uploads`);
        },
        filename: (req, file, callback) => {
            req.originalName = `${Date.now()}-${file.originalname}`;
            callback(null, req.originalName);
        }
    })
}).any();

module.exports = {
    upload
};