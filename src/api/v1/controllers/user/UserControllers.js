const {
    server: { domain },
    staticFilesUrlRoute,
    showDevLogsAndResponse
} = require(`${global.rootDirPath}config\\appConfig`);
const db = require("../../models");
const { standardResponse } = require("../../helpers");

const User = db.users;

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

const addUser = async(req, res) => {
    const files = [];
    req.files.forEach((file) => {
        if (showDevLogsAndResponse) console.log(__filename, " - addUser() - ", file);
        files.push(`${domain}${staticFilesUrlRoute}/${file.filename}`);
    });

    try {
        const user = await User.create({
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

const getAllUsers = async(req, res) => {
    try {
        const result = await User.findAll({
            where: {
                status: 1
            }
        });
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
            message: "Fetching User List Failed!",
            responseStatusCode: 502
        });
    }
};

const getById = async(req, res) => {
    try {
        const result = await User.findOne({
            where: {
                _id: req.params.userId,
                status: 1
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
            message: "Fetching User Failed!",
            responseStatusCode: 502
        });
    }
};

const userSearch = async(req, res) => {
    try {
        const result = await User.findOne({
            where: {
                ...req.body,
                status: 1
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
            message: "Searching User Failed!",
            responseStatusCode: 502
        });
    }
};

const updateUser = async(req, res) => {
    const { _id } = req.body;
    try {
        const result = await User.update(req.body, {
            where: {
                _id
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

const removeUser = async(req, res) => {
    const { _id } = req.body;
    try {
        const result = await User.update({
            status: 0
        }, {
            where: {
                _id
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
    addUser,
    getAllUsers,
    getById,
    userSearch,
    updateUser,
    removeUser
};