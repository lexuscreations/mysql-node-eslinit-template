require("dotenv").config();

const { SECRETKEYJWT: secretKeyJwt } = process.env;

module.exports = {
    server: {
        PORT: 3000,
        NODE_ENVIR: "local"
    },
    apiKeys: {
        smsKey: "",
        mailKey: ""
    },
    secretKeyJwt,
    bcryptSaltRound: 10,
    staticFilesUrlRoute: "/static",
    uploadPath: "/public/uploads/"
};