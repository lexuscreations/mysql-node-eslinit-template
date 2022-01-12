const { sequelize, DataTypes, onSuccess, onError } = require(`${global.rootDirPath}config\\databaseConfiguration`);

const db = {};

db.sequelize = global.sequelize;

db.users = require("./user/User")(sequelize, DataTypes);

db.sequelize
    .sync({
        force: false
    })
    .then(() => onSuccess("Db-Work-Complete - sequelizeSync-Models Also Complete Successfully!!"))
    .catch((error) => onError(error, "sequelizeSync-Models"));

module.exports = db;