const path = require("path");
const clc = require("cli-color");

global.rootDirPath = path.normalize(`${__dirname}/../`);
const express = require("express");
const cors = require("../config/cors");
const config = require("../config/config");
require("dotenv").config();
const { dbConnect } = require("../config/databaseConfiguration");

const app = express();

dbConnect();
const { writeDbsAllDbsModelsFile } = require("./api/v1/models");

writeDbsAllDbsModelsFile();

app.use(
  express.urlencoded({
    extended: true
  })
);

app.use(express.json());
cors(app);
app.use("/static", express.static(path.join(__dirname, "../", config.uploadUrl)));

app.use("/api", require("./api"));

const PORT = process.env.PORT || config.server.port;
const server = app.listen(PORT, () => {
  console.log(
    clc.green("[*]"),
    `ListeningOn Port: ${PORT} And ${
      process.env.TEST_ENV ? "ENV variables fetch successfully!" : "can't get ENV variables"
    }`
  );
});
