"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvironmentVariables = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.EnvironmentVariables = {
    DB_LIVEURI: process.env.DB_Connection_String,
    DB_LOCALURL: process.env.MongoDB_URL,
    PORT: process.env.PORT,
    AdminName: process.env.AdminName,
    AdminEmail: process.env.AdminEmail,
    AdminPassword: process.env.AdminPassword,
};
