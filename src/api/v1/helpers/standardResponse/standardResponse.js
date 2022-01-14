module.exports = ({
    res,
    status,
    isError = null,
    message = "",
    data = {},
    err = null,
    msg = null,
    success = null,
    errorCode = null,
    successCode = null,
    responseStatusCode = null
}) => {
    let isErrorInstance = isError;
    const isErrorValidated = isError === null;
    if (isErrorValidated) isErrorInstance = true;
    const resObj = {
        status: status === null ? (isErrorInstance ? 0 : 1) : status,
        isError: isErrorInstance,
        message: isErrorValidated ? "Please Provide standardResponse!" : message,
        msg,
        success: success === null ? !isErrorInstance : success,
        errorCode,
        successCode,
        data,
        err
    };

    Object.keys(resObj).forEach((val) => resObj[val] === null && delete resObj[val]);

    if (responseStatusCode === null) {
        res.json(resObj);
    } else {
        res.status(responseStatusCode).json(resObj);
    }
};