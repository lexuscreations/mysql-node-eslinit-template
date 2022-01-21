/* eslint-disable camelcase */
/* jshint indent: 2 */

module.exports = (sequelize, DataTypes) => {
    const panel_user_task_map = sequelize.define(
        "panel_user_task_map", {
            id: {
                type: DataTypes.INTEGER(11),
                allowNull: false,
                primaryKey: true
            },
            user_id: {
                type: DataTypes.INTEGER(11),
                allowNull: true,
                references: {
                    model: "panel_users",
                    key: "id"
                }
            },
            task_id: {
                type: DataTypes.INTEGER(11),
                allowNull: true,
                references: {
                    model: "panel_tasks",
                    key: "id"
                }
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
            tableName: "panel_user_task_map",
            associate(models) {
                panel_user_task_map.belongsTo(models.panel_tasks, {
                    as: "panel_tasks",
                    foreignKey: "task_id"
                });
            }
        }
    );
    return panel_user_task_map;
};