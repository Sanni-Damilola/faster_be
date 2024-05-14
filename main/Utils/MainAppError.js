"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainAppError = exports.HTTPCODES = void 0;
var HTTPCODES;
(function (HTTPCODES) {
    HTTPCODES[HTTPCODES["OK"] = 200] = "OK";
    HTTPCODES[HTTPCODES["CREATED"] = 201] = "CREATED";
    HTTPCODES[HTTPCODES["ACCEPTED"] = 202] = "ACCEPTED";
    HTTPCODES[HTTPCODES["REDIRECTED"] = 300] = "REDIRECTED";
    HTTPCODES[HTTPCODES["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    HTTPCODES[HTTPCODES["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    HTTPCODES[HTTPCODES["UNPROCESSABLE_IDENTITY"] = 422] = "UNPROCESSABLE_IDENTITY";
    HTTPCODES[HTTPCODES["CONFLICT"] = 409] = "CONFLICT";
    HTTPCODES[HTTPCODES["FORBIDDEN"] = 403] = "FORBIDDEN";
    HTTPCODES[HTTPCODES["NOT_FOUND"] = 404] = "NOT_FOUND";
    HTTPCODES[HTTPCODES["NOT_ACCEPTED"] = 406] = "NOT_ACCEPTED";
    HTTPCODES[HTTPCODES["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
    HTTPCODES[HTTPCODES["BAD_GATEWAY"] = 502] = "BAD_GATEWAY";
    HTTPCODES[HTTPCODES["SERVICE_UNAVAILABLE"] = 503] = "SERVICE_UNAVAILABLE";
    HTTPCODES[HTTPCODES["GATEWAY_TIMEOUT"] = 508] = "GATEWAY_TIMEOUT";
    HTTPCODES[HTTPCODES["NETWORK_TIMEOUT"] = 599] = "NETWORK_TIMEOUT";
})(HTTPCODES || (exports.HTTPCODES = HTTPCODES = {}));
class MainAppError extends Error {
    constructor(args) {
        super(args.message);
        this.isOperational = true;
        Object.setPrototypeOf(this, new.target.prototype);
        this.httpcode = args.httpcode;
        this.name = args.name || "Error";
        if (args.isOperational !== undefined) {
            this.isOperational = args.isOperational;
        }
        Error.captureStackTrace(this);
    }
}
exports.MainAppError = MainAppError;
