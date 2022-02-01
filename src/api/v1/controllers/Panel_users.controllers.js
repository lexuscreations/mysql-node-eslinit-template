/* eslint-disable eqeqeq */
/* eslint-disable camelcase */
const {
    server: {
 domain
},
    staticFilesUrlRoute,
    showDevLogsAndResponse
} = require(`${global.rootDirPath}config\\appConfig`);
const {
 Op
} = require("sequelize");
const db = require("../models");
const {
 standardResponse
} = require("../helpers");

const Panel_users = db.panel_users;

const errCatchResObjRetFn = (res, error) => {
    const {
 message
} = error && error.errors && error.errors[0] ? error.errors[0] : "";
    let resObj = {
        res,
        isError: true,
        message: "",
        responseStatusCode: null,
        msg: message
    };
    resObj = showDevLogsAndResponse
        ? {
            ...resObj,
            err: error
        }
        : {
            ...resObj
        };
    return resObj;
};

const addUser = async (req, res) => {
    const files = [];
    req.files.forEach((file) => {
        if (showDevLogsAndResponse) console.log(__filename, " - addUser() - ", file);
        files.push(`${domain}${staticFilesUrlRoute}/${file.filename}`);
    });

    try {
        const user = await Panel_users.create({
            ...req.body,
            profileImage: files[0]
        });
        standardResponse({
            res,
            isError: false,
            message: "User Created Successfully!",
            responseStatusCode: 201,
            successCode: 200,
            data: user
        });
    } catch (error) {
        standardResponse({
            ...errCatchResObjRetFn(res, error),
            message: "User Creation Failed!",
            responseStatusCode: 422,
            errorCode: 409
        });
    }
};

const getListUsers = async (req, res) => {
    try {
        let page = req.query && req.query.page
                ? req.query.page <= 0
                ? 1
                : req.query.page
                : 1;
        const status = req.query && req.query.status ? req.query.status == 0 ? "0" : "1" : "1";
        const order = req.query && req.query.order ? ["ASC", "DESC"].includes(req.query.order.toUpperCase()) ? req.query.order.toUpperCase() : "ASC" : "ASC";
        page = parseInt(page, 10) - 1;
        const options = {
            where: {
                status
            },
            limit: 20,
            offset: page * 20,
            order: [
                ["id", order]
            ]
        };
        const result = await Panel_users.findAll(options);
        if (result && result.length) {
            standardResponse({
                res,
                isError: false,
                message: "User List Fetch Successfully!",
                responseStatusCode: 200,
                status,
                data: result
            });
        } else {
            standardResponse({
                res,
                isError: false,
                message: "User Data Not Found!",
                responseStatusCode: 404,
                successCode: 204,
                data: {
}
            });
        }
    } catch (error) {
        standardResponse({
            ...errCatchResObjRetFn(res, error),
            message: "Fetching Panel_users List Failed!",
            responseStatusCode: 502
        });
    }
};

const getById = async (req, res) => {
    try {
        const status = "1";
        const result = await Panel_users.findOne({
            where: {
                [Op.and]: [{
                        id: parseInt(req.params.userId, 10)
                    },
                    {
                        status
                    }
                ]
            }
        });
        if (result) {
            standardResponse({
                res,
                isError: false,
                message: "User Fetch Successfully!",
                responseStatusCode: 200,
                status,
                data: result
            });
        } else {
            standardResponse({
                res,
                isError: false,
                message: "User Data Not Found!",
                responseStatusCode: 404,
                successCode: 204
            });
        }
    } catch (error) {
        standardResponse({
            ...errCatchResObjRetFn(res, error),
            message: "Fetching Panel_users Failed!",
            responseStatusCode: 502
        });
    }
};

const userSearch = async (req, res) => {
    try {
        const options = {
            where: {
                status: "1",
                ...req.body
            }
        };
        const result = await Panel_users.findAll(options);
        if (result) {
            standardResponse({
                res,
                isError: false,
                message: "User Found Successfully!",
                responseStatusCode: 200,
                status: options.where.status,
                data: result
            });
        } else {
            standardResponse({
                res,
                isError: false,
                message: "User Data Not Found!",
                responseStatusCode: 404,
                successCode: 204
            });
        }
    } catch (error) {
        standardResponse({
            ...errCatchResObjRetFn(res, error),
            message: "Searching Panel_users Failed!",
            responseStatusCode: 502
        });
    }
};

const updateUser = async (req, res) => {
    try {
        const result = await Panel_users.update(req.body.update, req.body.condition);
        if (result) {
            standardResponse({
                res,
                isError: false,
                message: "User Successfully Updated!",
                responseStatusCode: 201,
                data: result
            });
        } else {
            standardResponse({
                res,
                isError: false,
                message: "User Not Found For Update!",
                responseStatusCode: 404,
                successCode: 204
            });
        }
    } catch (error) {
        standardResponse({
            ...errCatchResObjRetFn(res, error),
            message: "User Updation Failed!",
            responseStatusCode: 502
        });
    }
};

const removeUser = async (req, res) => {
    try {
        const result = await Panel_users.update({
            status: 0
        }, req.body.condition);
        if (result) {
            standardResponse({
                res,
                isError: false,
                message: "User Successfully Deactivated!",
                responseStatusCode: 201,
                data: result
            });
        } else {
            standardResponse({
                res,
                isError: false,
                message: "User Not Found For Deactivation!",
                responseStatusCode: 404,
                successCode: 204
            });
        }
    } catch (error) {
        standardResponse({
            ...errCatchResObjRetFn(res, error),
            message: "User Deactivation Failed!",
            responseStatusCode: 502
        });
    }
};

module.exports = {
    addUser,
    getListUsers,
    getById,
    userSearch,
    updateUser,
    removeUser
};
