/* eslint-disable camelcase */
const {
    server: { domain },
    staticFilesUrlRoute,
    showDevLogsAndResponse
} = require(`${global.rootDirPath}config\\appConfig`);
const { Op } = require("sequelize");
const db = require("../models");
const { standardResponse } = require("../helpers");

const Panel_tasks = db.panel_tasks;

const errCatchResObjRetFn = (res, error) => {
    const { message } = error && error.errors && error.errors[0] ? error.errors[0] : "";
    let resObj = {
        res,
        isError: true,
        message: "",
        responseStatusCode: null,
        msg: message
    };
    resObj = showDevLogsAndResponse ?
        {
            ...resObj,
            err: error
        } :
        {
            ...resObj
        };
    return resObj;
};

const addTask = async(req, res) => {
    const files = [];
    req.files.forEach((file) => {
        if (showDevLogsAndResponse) console.log(__filename, " - addUser() - ", file);
        files.push(`${domain}${staticFilesUrlRoute}/${file.filename}`);
    });

    try {
        const user = await Panel_tasks.create({
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

const getListRoles = async(req, res) => {
    try {
        let option = {
            where: {
                status: "1"
            }
        };
        if (req.query && req.query.limit) {
            option = {
                ...option,
                limit: parseInt(req.query.limit, 10)
            };
        }
        const result = await Panel_tasks.findAll(option);
        if (result && result.length) {
            standardResponse({
                res,
                isError: false,
                message: "User List Fetch Successfully!",
                responseStatusCode: 200,
                data: result
            });
        } else {
            standardResponse({
                res,
                isError: false,
                message: "User Data Not Found!",
                responseStatusCode: 404,
                successCode: 204,
                data: {}
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

const getById = async(req, res) => {
    try {
        const result = await Panel_tasks.findOne({
            where: {
                [Op.and]: [{
                        id: parseInt(req.params.userId, 10)
                    },
                    {
                        status: "1"
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

const taskSearch = async(req, res) => {
    try {
        const result = await Panel_tasks.findOne({
            where: {
                ...req.body,
                status: "1"
            }
        });
        if (result) {
            standardResponse({
                res,
                isError: false,
                message: "User Found Successfully!",
                responseStatusCode: 200,
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

const updateTask = async(req, res) => {
    const { id } = req.body;
    try {
        const result = await Panel_tasks.update(req.body, {
            where: {
                id
            }
        });
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

const removeTask = async(req, res) => {
    const { id } = req.body;
    try {
        const result = await Panel_tasks.update({
            status: 0
        }, {
            where: {
                id
            }
        });
        if (result) {
            standardResponse({
                res,
                isError: false,
                message: "User Successfully Deleted!",
                responseStatusCode: 201,
                data: result
            });
        } else {
            standardResponse({
                res,
                isError: false,
                message: "User Not Found For Delete!",
                responseStatusCode: 404,
                successCode: 204
            });
        }
    } catch (error) {
        standardResponse({
            ...errCatchResObjRetFn(res, error),
            message: "User Deletion Failed!",
            responseStatusCode: 502
        });
    }
};

module.exports = {
    getListRoles,
    getById,
    taskSearch,
    addTask,
    updateTask,
    removeTask
};