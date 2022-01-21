/* eslint-disable camelcase */
/* jshint indent: 2 */

module.exports = (sequelize, DataTypes) => {
    const panel_user_role_map = sequelize.define(
        "panel_user_role_map", {
            id: {
                type: DataTypes.INTEGER(11),
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            panel_user_id: {
                type: DataTypes.INTEGER(11),
                allowNull: true,
                references: {
                    model: "panel_users",
                    key: "id"
                }
            },
            panel_role_id: {
                type: DataTypes.INTEGER(11),
                allowNull: true,
                references: {
                    model: "panel_roles",
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
            tableName: "panel_user_role_map",
            associate(models) {
                panel_user_role_map.belongsTo(models.panel_roles, {
                    as: "panel_roles",
                    foreignKey: "panel_role_id"
                });
            }
        }
    );
    return panel_user_role_map;
};