require("dotenv").config();

const { SECRETKEYJWT: secretKeyJwt } = process.env;

module.exports = {
    server: {
        PORT: 3000,
        NODE_ENVIR: "local", // enum: ["development", "production", "local"]
        domain: "http://localhost:3000"
    },
    apiKeys: {
        smsKey: "",
        mailKey: ""
    },
    secretKeyJwt,
    bcryptSaltRound: 10,
    staticFilesUrlRoute: "/static",
    uploadPath: "/public/uploads/",
    showDevLogsAndResponse: false
};