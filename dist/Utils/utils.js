"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleErrorResponse = exports.generateRandomNumericString = void 0;
const MainAppError_1 = require("./MainAppError");
const generateRandomNumericString = () => {
    const numericString = Math.floor(Math.random() * 10000000000).toString();
    return numericString.padStart(10, "0");
};
exports.generateRandomNumericString = generateRandomNumericString;
// error
function handleErrorResponse(error, res, statusCode = MainAppError_1.HTTPCODES.INTERNAL_SERVER_ERROR) {
    if (error instanceof Error) {
        return res.status(statusCode).json({ error: error.message });
    }
    else {
        return res.status(statusCode).json({ error });
    }
}
exports.handleErrorResponse = handleErrorResponse;
