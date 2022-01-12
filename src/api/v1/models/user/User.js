const { DataTypes } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

module.exports = () => {
    const User = global.sequelize.define("user", {
        _id: {
            type: DataTypes.STRING,
            defaultValue: uuidv4(),
            unique: true,
            allowNull: false
        },
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
            unique: true
        },
        profileImage: {
            type: DataTypes.STRING,
            allowNull: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        personalMobileNumber: {
            type: DataTypes.STRING,
            allowNull: false
        },
        whatsAppNumber: {
            type: DataTypes.STRING,
            allowNull: false
        },
        personalEmailAddress: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        designation: {
            type: DataTypes.STRING,
            allowNull: false
        },
        reportingTo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        officeLocation: {
            type: DataTypes.STRING,
            allowNull: false
        },
        department: {
            type: DataTypes.STRING,
            allowNull: false
        }
        // gender: {
        //     type: DataTypes.STRING,
        //     allowNull: false
        // },
        // programs: {
        //     type: DataTypes.STRING,
        //     allowNull: false
        // },
        // aboutTheCounsellor: {
        //     type: DataTypes.STRING,
        //     allowNull: true
        // },
        // dailyLeadLimit: {
        //     type: DataTypes.STRING,
        //     allowNull: false
        // },
        // BBADailyLeadLimit: {
        //     type: DataTypes.STRING,
        //     allowNull: false
        // },
        // MBALeadLimit: {
        //     type: DataTypes.STRING,
        //     allowNull: false
        // },
        // MCADailyLeadLimit: {
        //     type: DataTypes.STRING,
        //     allowNull: false
        // }
    });

    return User;
};