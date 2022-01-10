const Sequelize = require("sequelize");
const clc = require("cli-color");

const {
    server: { NODE_ENVIR },
    dbConfig
} = require("./config");

const { username, password, dbname, host, dialect, port } = dbConfig[NODE_ENVIR];

let sequelize;

const dbConnect = () => {
    let dbObj = {
        host,
        port,
        dialect,
        logging: (val) => console.log(`Db ${host} - Log: ${val}`),
        pool: {
            max: 25,
            min: 0,
            acquire: 60000,
            idle: 5000
        },
        define: {
            timestamps: false
        },
        dialectOptions: {
            ssl: {
                rejectUnauthorized: true
            },
            charset: "utf8mb4"
        },
        timezone: "+05:30"
    };
    if (NODE_ENVIR === "local") {
        dbObj = {
            host,
            port,
            dialect,
            logging: (val) => console.log(`Db ${host} - Log: ${val}`),
            pool: {
                max: 25,
                min: 0,
                acquire: 60000,
                idle: 5000
            },
            define: {
                timestamps: false
            },
            dialectOptions: {
                charset: "utf8mb4"
            },
            timezone: "+05:30"
        };
    }
    try {
        sequelize = new Sequelize(dbname, username, password, dbObj);
        global.sequelize = sequelize;
        console.log(clc.green("[*]"), `Db: ${host} - Connection Success and set as global Successfully!!`);
    } catch (error) {
        console.log(clc.red("[*]"), `Db: ${host} - Connection Error: ${error}`);
    }
};

module.exports = {
    dbConnect,
    sequelize,
    Sequelize
};