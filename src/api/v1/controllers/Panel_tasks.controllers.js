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

const Panel_tasks = db.panel_tasks;

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

const addTask = async (req, res) => {
    try {
        const task = await Panel_tasks.create({
            ...req.body
        });
        standardResponse({
            res,
            isError: false,
            message: "Task Created Successfully!",
            responseStatusCode: 201,
            successCode: 200,
            data: task
        });
    } catch (error) {
        standardResponse({
            ...errCatchResObjRetFn(res, error),
            message: "Task Creation Failed!",
            responseStatusCode: 422,
            errorCode: 409
        });
    }
};

const getListTasks = async (req, res) => {
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
        const result = await Panel_tasks.findAll(options);
        if (result && result.length) {
            standardResponse({
                res,
                isError: false,
                message: "Task List Fetch Successfully!",
                responseStatusCode: 200,
                status,
                data: result
            });
        } else {
            standardResponse({
                res,
                isError: false,
                message: "Task Data Not Found!",
                responseStatusCode: 404,
                successCode: 204,
                data: {
}
            });
        }
    } catch (error) {
        standardResponse({
            ...errCatchResObjRetFn(res, error),
            message: "Fetching Panel_tasks List Failed!",
            responseStatusCode: 502
        });
    }
};

const getById = async (req, res) => {
    try {
        const status = "1";
        const result = await Panel_tasks.findOne({
            where: {
                [Op.and]: [{
                        id: parseInt(req.params.taskId, 10)
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
                message: "Task Fetch Successfully!",
                responseStatusCode: 200,
                status,
                data: result
            });
        } else {
            standardResponse({
                res,
                isError: false,
                message: "Task Data Not Found!",
                responseStatusCode: 404,
                successCode: 204
            });
        }
    } catch (error) {
        standardResponse({
            ...errCatchResObjRetFn(res, error),
            message: "Fetching Panel_tasks Failed!",
            responseStatusCode: 502
        });
    }
};

const taskSearch = async (req, res) => {
    try {
        const options = {
            where: {
                status: "1",
                ...req.body
            }
        };
        const result = await Panel_tasks.findAll(options);
        if (result) {
            standardResponse({
                res,
                isError: false,
                message: "Task Found Successfully!",
                responseStatusCode: 200,
                status: options.where.status,
                data: result
            });
        } else {
            standardResponse({
                res,
                isError: false,
                message: "Task Data Not Found!",
                responseStatusCode: 404,
                successCode: 204
            });
        }
    } catch (error) {
        standardResponse({
            ...errCatchResObjRetFn(res, error),
            message: "Searching Panel_tasks Failed!",
            responseStatusCode: 502
        });
    }
};

const updateTask = async (req, res) => {
    try {
        const result = await Panel_tasks.update(req.body.update, req.body.condition);
        if (result) {
            standardResponse({
                res,
                isError: false,
                message: "Task Successfully Updated!",
                responseStatusCode: 201,
                data: result
            });
        } else {
            standardResponse({
                res,
                isError: false,
                message: "Task Not Found For Update!",
                responseStatusCode: 404,
                successCode: 204
            });
        }
    } catch (error) {
        standardResponse({
            ...errCatchResObjRetFn(res, error),
            message: "Task Updation Failed!",
            responseStatusCode: 502
        });
    }
};

const removeTask = async (req, res) => {
    try {
        const result = await Panel_tasks.update({
            status: 0
        }, req.body.condition);
        if (result) {
            standardResponse({
                res,
                isError: false,
                message: "Task Successfully Deactivated!",
                responseStatusCode: 201,
                data: result
            });
        } else {
            standardResponse({
                res,
                isError: false,
                message: "Task Not Found For Deactivation!",
                responseStatusCode: 404,
                successCode: 204
            });
        }
    } catch (error) {
        standardResponse({
            ...errCatchResObjRetFn(res, error),
            message: "Task Deactivation Failed!",
            responseStatusCode: 502
        });
    }
};

module.exports = {
    getListTasks,
    getById,
    taskSearch,
    addTask,
    updateTask,
    removeTask
};
