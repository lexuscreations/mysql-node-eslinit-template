/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define("panel_tasks", {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    task_name: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    task_description: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM("0", "1"),
      allowNull: true,
      defaultValue: "1"
    },
    created: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP")
    },
    modified: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP")
    }
  }, {
    tableName: "panel_tasks"
  });
};
