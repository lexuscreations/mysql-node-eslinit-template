const path = require("path");

global.rootDirPath = path.normalize(`${__dirname}/../`);
const express = require("express");

const app = express();
const clc = require("cli-color");
const cors = require("../config/cors");
const config = require("../config/appConfig");
require("dotenv").config();
require("../config/databaseConfiguration").dbConnect();

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
        `Server: ListeningOn Port: ${PORT} And ${
      process.env.TEST_ENV ? "ENV variables fetch successfully!" : "can't get ENV variables"
    }`
    );
});