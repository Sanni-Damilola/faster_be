"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainAppConfig = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const ErrorHandler_1 = require("./MiddleWare/Error/ErrorHandler");
const MainAppError_1 = require("./Utils/MainAppError");
const route_1 = __importDefault(require("./routes/route"));
const MainAppConfig = (app) => {
    app
        .use((0, cors_1.default)())
        .use((0, morgan_1.default)("dev"))
        .use(express_1.default.json())
        .get("/", (req, res) => {
        const DATE = new Date().toLocaleDateString();
        const TIME = new Date().toLocaleTimeString();
        const dateTime = `${DATE} ${TIME}`;
        res.status(MainAppError_1.HTTPCODES.OK).send(dateTime);
        // landing route
    })
        .use("/api", route_1.default) //Routes
        .all("*", (req, res, next) => {
        //   Configuring Routes for the application:
        return next(new MainAppError_1.MainAppError({
            message: `Are You Lost? ${req.originalUrl} Not found`,
            httpcode: MainAppError_1.HTTPCODES.NOT_FOUND,
        }));
    }) // 404 Routes
        .use(ErrorHandler_1.errorHandler); // error handler
};
exports.MainAppConfig = MainAppConfig;
