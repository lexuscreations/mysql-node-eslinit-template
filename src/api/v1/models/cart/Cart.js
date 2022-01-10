const Sequelize = require("sequelize");

module.exports = {
  id: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  items: Sequelize.INTEGER(25)
};
