const { sequelize, DataTypes, onSuccess, onError } = require(`${global.rootDirPath}config\\databaseConfiguration`);

const db = {};

db.sequelize = global.sequelize;

db.users = require("./user/User")(sequelize, DataTypes);

const dbSync = async() => {
    try {
        await db.sequelize.sync({
            force: false
        });
        onSuccess("Db-Work-Complete - sequelizeSync-Models Also Complete Successfully!!");
    } catch (error) {
        onError(error, "sequelizeSync-Models");
    }
};
dbSync();
module.exports = db;