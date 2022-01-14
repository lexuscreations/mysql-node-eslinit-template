// global.rootPathFinder = (callerPath) => {
//     let temp;
//     return path
//         .normalize(callerPath)
//         .split(global.rootDirPath)[1]
//         .replace("\\\\", "\\")
//         .split("\\")
//         .filter((val) => val)
//         .map((val) => "../")
//         .join("");
// };

// const { writeDbsAllDbsModelsFile } = require("./api/v1/models");

// writeDbsAllDbsModelsFile();

// --------------------------------------------------------------------------------------------------

// "use strict";

// const path = require("path");
// const fs = require("fs");
// const clc = require("cli-color");

// const StandardError = require("standard-error");
// const glob = require("glob");

// const writeDbsAllDbsModelsFile = () => {
//   try {
//     const getDirectories = (src, callback) => glob(`${src}/**/*`, callback);
//     getDirectories(__dirname, (err, res) => {
//       const dbs = {};
//       if (err) throw new Error();
//       res
//         .filter((file) => file.indexOf(".") !== 0 && path.normalize(file) !== __filename && file.slice(-3) === ".js")
//         .forEach((file) => {
//           global.sequelize.define(path.parse(file).name, require(file));
//           dbs[path.parse(file).name] = require(file);
//         });
//       fs.readFile(`${__dirname}\\allDbs.json`, "utf8", (error, jsonString) => {
//         if (error) throw new Error();
//         let valueArrForWrite = [];
//         if (Array.isArray(jsonString)) {
//           jsonString.push(dbs);
//           valueArrForWrite = jsonString;
//         } else {
//           valueArrForWrite.push(dbs);
//         }
//         fs.writeFile(`${__dirname}\\allDbs.json`, JSON.stringify(valueArrForWrite), "utf8", (Err) => {
//           if (Err) throw new Error();
//           console.log(clc.green("[*]"), `allDbs.json - \\src${__dirname.split("\\src")[1]}\\allDbs.json - ready!`);
//         });
//       });
//     });
//   } catch (error) {
//     throw new StandardError(`${__dirname} - writeDbsAllDbsModelsFile() - Err: ${error.message}`);
//   }
// };

// const readDbsAllDbsModelsFile = () => {
//   try {
//     const log = fs.readFile(`${__dirname}\\allDbs.json`, "utf8", (err, jsonString) => {
//       if (err) throw new Error();
//       console.log(jsonString);
//     });
//     console.log(log);
//   } catch (error) {
//     throw new StandardError(`${__dirname} - readDbsAllDbsModelsFile() - Err: ${error.message}`);
//   }
// };
// module.exports = {
//   writeDbsAllDbsModelsFile,
//   readDbsAllDbsModelsFile
// };

// db.products.hasMany(db.reviews, {
//     foreignKey: "product_id",
//     as: "review"
// });

// db.reviews.belongsTo(db.products, {
//     foreignKey: "product_id",
//     as: "product"
// });

// ---------------------------------------------------------------------------------------

// app.use("*", (req, res, next) => {
//     res.status(404).render("404", {
//         title: "Sorry - 404_NotFound - Sunstone Eduversity: India's #1 Pay After Placement MBA School"
//     });
//     next();
// });

// ---------------------------------------------------------------------------------------

// process.on("uncaughtException", (err) => {
//     console.log(err.name, err.message);
//     console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
//     process.exit(1);
// });
// process.on("unhandledRejection", (err) => {
//     console.log(err.name, err.message);
//     console.log("UNHANDLED REJECTION! 💥 Shutting down...");
//     process.exit(1);
// });