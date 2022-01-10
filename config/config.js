require("dotenv").config();

const {
  DEV_DBPORT,
  DEV_DBUSER,
  DEV_DBPASS,
  DEV_DBNAME,
  DEV_DBHOST,
  DEV_DIALECT,

  LOCAL_DBPORT,
  LOCAL_DBUSER,
  LOCAL_DBPASS,
  LOCAL_DBNAME,
  LOCAL_DBHOST,
  LOCAL_DIALECT,

  PROD_DBPORT,
  PROD_DBUSER,
  PROD_DBPASS,
  PROD_DBNAME,
  PROD_DBHOST,
  PROD_DIALECT,

  SECRETKEYJWT: secretKeyJwt
} = process.env;

module.exports = {
  server: {
    port: 3000,
    NODE_ENVIR: "local"
  },
  dbConfig: {
    development: {
      username: DEV_DBUSER,
      password: DEV_DBPASS,
      dbname: DEV_DBNAME,
      host: DEV_DBHOST,
      dialect: DEV_DIALECT,
      port: DEV_DBPORT
    },
    local: {
      username: LOCAL_DBUSER,
      password: LOCAL_DBPASS,
      dbname: LOCAL_DBNAME,
      host: LOCAL_DBHOST,
      dialect: LOCAL_DIALECT,
      port: LOCAL_DBPORT
    },
    production: {
      username: PROD_DBUSER,
      password: PROD_DBPASS,
      dbname: PROD_DBNAME,
      host: PROD_DBHOST,
      dialect: PROD_DIALECT,
      port: PROD_DBPORT
    }
  },
  apiKeys: {
    smsKey: ""
  },
  secretKeyJwt,
  bcryptSaltRound: 10,
  staticFilesUrl: "",
  uploadUrl: "public/uploads/"
};
