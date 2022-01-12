const path = require("path");
const clc = require("cli-color");

global.rootDirPath = path.normalize(`${__dirname}/../`);
const express = require("express");
const cors = require("../config/cors");
const config = require("../config/appConfig");
require("dotenv").config();
const { dbConnect } = require("../config/databaseConfiguration");

const app = express();

dbConnect();

app.use(
    express.urlencoded({
        extended: true
    })
);

app.use(express.json());

cors(app);

app.use(config.staticFilesUrlRoute, express.static(path.join(__dirname, "../", config.uploadPath)));

app.use("/api", require("./api"));

const PORT = process.env.PORT || config.server.PORT;
const server = app.listen(PORT, () => {
    console.log(
        clc.green("[*]"),
        `ListeningOn Port: ${PORT} And ${
      process.env.TEST_ENV ? "ENV variables fetch successfully!" : "can't get ENV variables"
    }`
    );
});