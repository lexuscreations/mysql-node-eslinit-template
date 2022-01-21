/* eslint-disable camelcase */
/* jshint indent: 2 */

module.exports = (sequelize, DataTypes) => {
    const panel_users = sequelize.define(
        "panel_users", {
            id: {
                type: DataTypes.INTEGER(11),
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            reporting_to: {
                type: DataTypes.INTEGER(11),
                allowNull: true,
                references: {
                    model: "panel_users",
                    key: "id"
                }
            },
            guid: {
                type: DataTypes.STRING(255),
                allowNull: true
            },
            campus: {
                type: DataTypes.STRING(255),
                allowNull: true
            },
            name: {
                type: DataTypes.STRING(255),
                allowNull: true
            },
            email: {
                type: DataTypes.STRING(100),
                allowNull: true
            },
            gender: {
                type: DataTypes.ENUM("Male", "Female", "Other"),
                allowNull: true
            },
            mobile: {
                type: DataTypes.STRING(45),
                allowNull: false,
                unique: true
            },
            whatsapp_no: {
                type: DataTypes.STRING(45),
                allowNull: true
            },
            profile_picture: {
                type: DataTypes.STRING(255),
                allowNull: true
            },
            about_counsellor: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            login_otp: {
                type: DataTypes.STRING(45),
                allowNull: true
            },
            login_otp_time: {
                type: DataTypes.DATE,
                allowNull: true
            },
            mobile_login_allowed: {
                type: DataTypes.ENUM("0", "1"),
                allowNull: true
            },
            program: {
                type: DataTypes.STRING(55),
                allowNull: true
            },
            daily_lead_limit: {
                type: DataTypes.INTEGER(11),
                allowNull: true
            },
            daily_lead_limit_bba: {
                type: DataTypes.INTEGER(11),
                allowNull: true
            },
            daily_lead_limit_mca: {
                type: DataTypes.INTEGER(11),
                allowNull: true
            },
            daily_lead_limit_online_mba: {
                type: DataTypes.INTEGER(11),
                allowNull: true
            },
            today_lead_count_mba: {
                type: DataTypes.INTEGER(11),
                allowNull: true
            },
            today_lead_count_bba: {
                type: DataTypes.INTEGER(11),
                allowNull: true
            },
            today_lead_count_mca: {
                type: DataTypes.INTEGER(11),
                allowNull: true
            },
            today_lead_count_online_mba: {
                type: DataTypes.INTEGER(11),
                allowNull: true
            },
            lead_category: {
                type: DataTypes.STRING(50),
                allowNull: true
            },
            counsellor_teams: {
                type: DataTypes.STRING(255),
                allowNull: true
            },
            counsellor_states: {
                type: DataTypes.STRING(255),
                allowNull: true
            },
            fcm_token: {
                type: DataTypes.STRING(255),
                allowNull: true
            },
            version_code: {
                type: DataTypes.STRING(45),
                allowNull: true
            },
            affiliate_mapped_counsellors: {
                type: DataTypes.STRING(255),
                allowNull: true
            },
            affiliate_type: {
                type: DataTypes.STRING(255),
                allowNull: true
            },
            refferal_id: {
                type: DataTypes.STRING(45),
                allowNull: true
            },
            affiliate_prepaid_content_fee: {
                type: DataTypes.INTEGER(11),
                allowNull: true
            },
            last_login: {
                type: DataTypes.DATE,
                allowNull: true
            },
            status: {
                type: DataTypes.ENUM("0", "1"),
                allowNull: true
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
            tableName: "panel_users",
            associate(models) {
                panel_users.hasMany(models.panel_user_role_map, {
                    as: "panel_user_role_map",
                    foreignKey: "panel_user_id"
                });
                panel_users.hasMany(models.panel_user_task_map, {
                    as: "panel_user_task_map",
                    foreignKey: "user_id"
                });
                panel_users.belongsTo(models.panel_users, {
                    as: "reporting_to_details",
                    foreignKey: "reporting_to"
                });
            }
        }
    );
    return panel_users;
};