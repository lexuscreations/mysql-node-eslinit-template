const { sequelize, DataTypes, onSuccess, onError } = require(`${global.rootDirPath}config\\databaseConfiguration`);

const db = {};

db.sequelize = sequelize;

db.panel_users = require("./panel_users")(sequelize, DataTypes);
db.panel_roles = require("./panel_roles")(sequelize, DataTypes);
db.panel_tasks = require("./panel_tasks")(sequelize, DataTypes);
db.panel_user_role_map = require("./panel_user_role_map")(sequelize, DataTypes);
db.panel_user_task_map = require("./panel_user_task_map")(sequelize, DataTypes);

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