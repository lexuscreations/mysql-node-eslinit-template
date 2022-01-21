const { Sequelize, DataTypes } = require("sequelize");

const {
    server: { NODE_ENVIR }
} = require("./appConfig");

const { username, password, DBname, dbObj, onSuccess, onError } = require(`./DB_Config/dbConfig_${NODE_ENVIR}`);

const dbConnect = () => {
    let sequelizeInDb;
    try {
        sequelizeInDb = new Sequelize(DBname, username, password, dbObj);
        global.sequelize = sequelizeInDb;
        onSuccess("Db-ConnectionDone - set as global - sequelizeAuthenticate Pending!!");
    } catch (error) {
        onError(error);
    }

    sequelizeInDb
        .authenticate()
        .then(() => onSuccess("sequelizeAuthenticate Complete - sequelizeSync-Models Pending!!"))
        .catch((error) => onError(error, "sequelizeAuthenticate"));

    return sequelizeInDb;
};

const sequelize = dbConnect();

module.exports = {
    dbConnect,
    sequelize,
    Sequelize,
    DataTypes,
    onSuccess,
    onError
};