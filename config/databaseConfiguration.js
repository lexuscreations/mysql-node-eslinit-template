const { Sequelize, DataTypes } = require("sequelize");

const {
    server: { NODE_ENVIR }
} = require("./appConfig");

const { username, password, DBname, dbObj, onSuccess, onError } = require(`./DB_Config/dbConfig_${NODE_ENVIR}`);

let sequelize;

const dbConnect = () => {
    try {
        sequelize = new Sequelize(DBname, username, password, dbObj);
        global.sequelize = sequelize;
        onSuccess("Db-ConnectionDone - set as global - sequelizeAuthenticate Pending!!");
    } catch (error) {
        onError(error);
    }

    sequelize
        .authenticate()
        .then(() => onSuccess("sequelizeAuthenticate Complete - sequelizeSync-Models Pending!!"))
        .catch((error) => onError(error, "sequelizeAuthenticate"));
};

module.exports = {
    dbConnect,
    sequelize,
    Sequelize,
    DataTypes,
    onSuccess,
    onError
};