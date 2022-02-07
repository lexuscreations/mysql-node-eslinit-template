/* eslint-disable eqeqeq */
/* eslint-disable camelcase */
const {
    showDevLogsAndResponse
} = require(`${global.rootDirPath}config\\appConfig`);
const {
 Op
} = require("sequelize");
const db = require("../models");
const {
 standardResponse
} = require("../helpers");

const Panel_roles = db.panel_roles;

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

const addRole = async (req, res) => {
    try {
        const role = await Panel_roles.create({
            ...req.body
        });
        standardResponse({
            res,
            isError: false,
            message: "Role Created Successfully!",
            responseStatusCode: 201,
            successCode: 200,
            data: role
        });
    } catch (error) {
        standardResponse({
            ...errCatchResObjRetFn(res, error),
            message: "Role Creation Failed!",
            responseStatusCode: 422,
            errorCode: 409
        });
    }
};

const getListRoles = async (req, res) => {
    try {
        let page = req.query && req.query.page
                ? req.query.page <= 0
                ? 1
                : req.query.page
                : 1;
        const status = req.query && req.query.status ? req.query.status == 0 ? "0" : "1" : "1";
        const order = req.query && req.query.order ? ["ASC", "DESC"].includes(req.query.order.toUpperCase()) ? req.query.order.toUpperCase() : "ASC" : "ASC";
        page = parseInt(page, 10) - 1;
        let options = {
            where: {
                status
            },
            limit: 20,
            offset: page * 20,
            order: [
                ["id", order]
            ]
        };

        options = {
...options, ...req.body.keys
};

        const result = await Panel_roles.findAll(options);
        if (result && result.length) {
            standardResponse({
                res,
                isError: false,
                message: "Role List Fetch Successfully!",
                responseStatusCode: 200,
                status,
                data: result
            });
        } else {
            standardResponse({
                res,
                isError: false,
                message: "Role Data Not Found!",
                responseStatusCode: 404,
                successCode: 204,
                data: {
}
            });
        }
    } catch (error) {
        standardResponse({
            ...errCatchResObjRetFn(res, error),
            message: "Fetching Panel_roles List Failed!",
            responseStatusCode: 502
        });
    }
};

const getById = async (req, res) => {
    try {
        const status = "1";
        const result = await Panel_roles.findOne({
            where: {
                [Op.and]: [{
                        id: parseInt(req.params.roleId, 10)
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
                message: "Role Fetch Successfully!",
                responseStatusCode: 200,
                status,
                data: result
            });
        } else {
            standardResponse({
                res,
                isError: false,
                message: "Role Data Not Found!",
                responseStatusCode: 404,
                successCode: 204
            });
        }
    } catch (error) {
        standardResponse({
            ...errCatchResObjRetFn(res, error),
            message: "Fetching Panel_roles Failed!",
            responseStatusCode: 502
        });
    }
};

const roleSearch = async (req, res) => {
    try {
        const options = {
            where: {
                status: "1",
                ...req.body
            }
        };
        const result = await Panel_roles.findAll(options);
        if (result) {
            standardResponse({
                res,
                isError: false,
                message: "Role Found Successfully!",
                responseStatusCode: 200,
                status: options.where.status,
                data: result
            });
        } else {
            standardResponse({
                res,
                isError: false,
                message: "Role Data Not Found!",
                responseStatusCode: 404,
                successCode: 204
            });
        }
    } catch (error) {
        standardResponse({
            ...errCatchResObjRetFn(res, error),
            message: "Searching Panel_roles Failed!",
            responseStatusCode: 502
        });
    }
};

const updateRole = async (req, res) => {
    try {
        const result = await Panel_roles.update(req.body.update, req.body.condition);
        if (result) {
            standardResponse({
                res,
                isError: false,
                message: "Role Successfully Updated!",
                responseStatusCode: 201,
                data: result
            });
        } else {
            standardResponse({
                res,
                isError: false,
                message: "Role Not Found For Update!",
                responseStatusCode: 404,
                successCode: 204
            });
        }
    } catch (error) {
        standardResponse({
            ...errCatchResObjRetFn(res, error),
            message: "Role Updation Failed!",
            responseStatusCode: 502
        });
    }
};

const removeRole = async (req, res) => {
    try {
        const result = await Panel_roles.update({
            status: 0
        }, req.body.condition);
        if (result) {
            standardResponse({
                res,
                isError: false,
                message: "Role Successfully Deactivated!",
                responseStatusCode: 201,
                data: result
            });
        } else {
            standardResponse({
                res,
                isError: false,
                message: "Role Not Found For Deactivation!",
                responseStatusCode: 404,
                successCode: 204
            });
        }
    } catch (error) {
        standardResponse({
            ...errCatchResObjRetFn(res, error),
            message: "Role Deactivation Failed!",
            responseStatusCode: 502
        });
    }
};

module.exports = {
    addRole,
    getListRoles,
    getById,
    roleSearch,
    updateRole,
    removeRole
};
