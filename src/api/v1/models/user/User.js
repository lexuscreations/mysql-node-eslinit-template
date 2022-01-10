const Sequelize = require("sequelize");

module.exports = {
  id: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  firstName: Sequelize.INTEGER(25)
};
