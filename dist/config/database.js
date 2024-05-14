"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBCONNECTION = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const envV_1 = require("./envV");
const DB_Connection_String = envV_1.EnvironmentVariables.DB_LIVEURI;
const DBCONNECTION = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // await mongoose.connect(
        //   "mongodb://0.0.0.0:27017/faster"
        // );
        yield mongoose_1.default.connect(DB_Connection_String);
        console.log("");
        if (mongoose_1.default.connection.host === "0.0.0.0") {
            console.log("You're Connected to Local Host"); // if connected to local database
        }
        else {
            console.log("You're Connected To Live"); // if connected to cloud database
        }
    }
    catch (error) {
        console.log("Database connection error. Couldn't connect because ", error);
    }
});
exports.DBCONNECTION = DBCONNECTION;
