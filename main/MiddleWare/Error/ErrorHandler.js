"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const MainAppError_1 = require("../../Utils/MainAppError");
const DeveloperError = (err, res) => {
    return res.status(MainAppError_1.HTTPCODES.INTERNAL_SERVER_ERROR).json({
        error: err,
        message: err.message,
        stack: err.stack,
        status: err.httpcode,
    });
};
const errorHandler = (err, req, res, next) => {
    DeveloperError(err, res);
};
exports.errorHandler = errorHandler;
