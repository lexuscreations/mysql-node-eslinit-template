"use strict";

const path = require("path");
const fs = require("fs");
const clc = require("cli-color");

const StandardError = require("standard-error");
const glob = require("glob");

const writeDbsAllDbsModelsFile = () => {
  try {
    const getDirectories = (src, callback) => glob(`${src}/**/*`, callback);
    getDirectories(__dirname, (err, res) => {
      const dbs = {};
      if (err) throw new Error();
      res
        .filter((file) => file.indexOf(".") !== 0 && path.normalize(file) !== __filename && file.slice(-3) === ".js")
        .forEach((file) => {
          global.sequelize.define(path.parse(file).name, require(file));
          dbs[path.parse(file).name] = require(file);
        });
      fs.readFile(`${__dirname}\\allDbs.json`, "utf8", (error, jsonString) => {
        if (error) throw new Error();
        let valueArrForWrite = [];
        if (Array.isArray(jsonString)) {
          jsonString.push(dbs);
          valueArrForWrite = jsonString;
        } else {
          valueArrForWrite.push(dbs);
        }
        fs.writeFile(`${__dirname}\\allDbs.json`, JSON.stringify(valueArrForWrite), "utf8", (Err) => {
          if (Err) throw new Error();
          console.log(clc.green("[*]"), `allDbs.json - \\src${__dirname.split("\\src")[1]}\\allDbs.json - ready!`);
        });
      });
    });
  } catch (error) {
    throw new StandardError(`${__dirname} - writeDbsAllDbsModelsFile() - Err: ${error.message}`);
  }
};

const readDbsAllDbsModelsFile = () => {
  try {
    const log = fs.readFile(`${__dirname}\\allDbs.json`, "utf8", (err, jsonString) => {
      if (err) throw new Error();
      console.log(jsonString);
    });
    console.log(log);
  } catch (error) {
    throw new StandardError(`${__dirname} - readDbsAllDbsModelsFile() - Err: ${error.message}`);
  }
};
module.exports = {
  writeDbsAllDbsModelsFile,
  readDbsAllDbsModelsFile
};
