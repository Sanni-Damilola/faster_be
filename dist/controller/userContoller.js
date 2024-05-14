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
exports.deleteClient = exports.editClient = exports.createClient = exports.upateAdmin = exports.getOneClient = exports.getAdmin = exports.loginAdmin = exports.createAdmin = exports.ViewAllUsers = void 0;
const AsyncHandler_1 = require("../MiddleWare/AsyncHandler");
const MainAppError_1 = require("../Utils/MainAppError");
const userModel_1 = __importDefault(require("../model/userModel"));
const envV_1 = require("../config/envV");
const ClientModel_1 = __importDefault(require("../model/ClientModel"));
const ShipmentHistory_1 = __importDefault(require("../model/ShipmentHistory"));
const mongoose_1 = __importDefault(require("mongoose"));
const utils_1 = require("../Utils/utils");
exports.ViewAllUsers = (0, AsyncHandler_1.AsyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield ClientModel_1.default.find().populate("ShipmentHistory");
        return res.status(MainAppError_1.HTTPCODES.OK).json({
            length: users === null || users === void 0 ? void 0 : users.length,
            message: (users === null || users === void 0 ? void 0 : users.length) === 0
                ? "No client yet"
                : "All client successfully gotten",
            data: users,
        });
    }
    catch (error) {
        return res.status(MainAppError_1.HTTPCODES.BAD_REQUEST).json({
            message: "An Error Occured ViewAllUsers",
            error: error,
        });
    }
}));
exports.createAdmin = (0, AsyncHandler_1.AsyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const checkIfExist = yield userModel_1.default.findOne({
            email: envV_1.EnvironmentVariables === null || envV_1.EnvironmentVariables === void 0 ? void 0 : envV_1.EnvironmentVariables.AdminEmail,
        });
        if (checkIfExist) {
            return next(new MainAppError_1.MainAppError({
                message: "Admin Already Exist",
                httpcode: MainAppError_1.HTTPCODES.BAD_REQUEST,
            }));
        }
        yield userModel_1.default.create({
            name: envV_1.EnvironmentVariables === null || envV_1.EnvironmentVariables === void 0 ? void 0 : envV_1.EnvironmentVariables.AdminName,
            email: envV_1.EnvironmentVariables === null || envV_1.EnvironmentVariables === void 0 ? void 0 : envV_1.EnvironmentVariables.AdminEmail,
            password: envV_1.EnvironmentVariables === null || envV_1.EnvironmentVariables === void 0 ? void 0 : envV_1.EnvironmentVariables.AdminPassword,
        });
        return res.status(MainAppError_1.HTTPCODES.OK).json({
            message: "Created",
        });
    }
    catch (error) {
        return res.status(MainAppError_1.HTTPCODES.BAD_REQUEST).json({
            message: "An Error Occured in createAdmin",
            error: error,
        });
    }
}));
exports.loginAdmin = (0, AsyncHandler_1.AsyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const getUser = yield userModel_1.default.findOne({ email });
        if (!getUser) {
            return next(new MainAppError_1.MainAppError({
                message: "Invalid credentials. Please try again.",
                httpcode: MainAppError_1.HTTPCODES.UNAUTHORIZED,
            }));
        }
        if (getUser.password !== password) {
            return next(new MainAppError_1.MainAppError({
                message: "Invalid credentials. Please try again.",
                httpcode: MainAppError_1.HTTPCODES.UNAUTHORIZED,
            }));
        }
        return res.status(MainAppError_1.HTTPCODES.OK).json({
            message: "Login successful",
            data: getUser._id,
        });
    }
    catch (error) {
        return res.status(MainAppError_1.HTTPCODES.INTERNAL_SERVER_ERROR).json({
            message: "An error occurred during login.",
            error: error.message,
        });
    }
}));
exports.getAdmin = (0, AsyncHandler_1.AsyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const getAdmin = yield userModel_1.default.findById(userID);
        return res.status(MainAppError_1.HTTPCODES.OK).json({
            data: getAdmin,
        });
    }
    catch (error) {
        if (error.path === "_id") {
            return res.status(MainAppError_1.HTTPCODES.NOT_FOUND).json({
                message: "An Error Occured in getAdmin(id)",
            });
        }
        return res.status(MainAppError_1.HTTPCODES.INTERNAL_SERVER_ERROR).json({
            message: "An Error Occured in getAdmin",
            error: error === null || error === void 0 ? void 0 : error.message,
        });
    }
}));
exports.getOneClient = (0, AsyncHandler_1.AsyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { TRACKINGID } = req.params;
        const getClient = yield ClientModel_1.default
            .findOne({ TRACKINGID })
            .populate("ShipmentHistory");
        if (!getClient) {
            return next(new MainAppError_1.MainAppError({
                message: "ID Not Found",
                httpcode: MainAppError_1.HTTPCODES.NOT_FOUND,
            }));
        }
        return res.status(MainAppError_1.HTTPCODES.OK).json({
            data: getClient,
        });
    }
    catch (error) {
        return res.status(MainAppError_1.HTTPCODES.INTERNAL_SERVER_ERROR).json({
            message: "An Error Occured in getClient",
            error: error === null || error === void 0 ? void 0 : error.message,
        });
    }
}));
exports.upateAdmin = (0, AsyncHandler_1.AsyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const getAdmin = yield userModel_1.default.findById(userID);
        const { name, password, email } = req.body;
        yield userModel_1.default.findByIdAndUpdate(getAdmin === null || getAdmin === void 0 ? void 0 : getAdmin._id, {
            name,
            email,
            password,
        });
        return res.status(MainAppError_1.HTTPCODES.OK).json({
            message: "Udated",
        });
    }
    catch (error) {
        if (error.path === "_id") {
            return res.status(MainAppError_1.HTTPCODES.NOT_FOUND).json({
                message: "An Error Occured in getAdmin(id)",
            });
        }
        return res.status(MainAppError_1.HTTPCODES.INTERNAL_SERVER_ERROR).json({
            message: "An Error Occured in upateAdmin",
            error: error === null || error === void 0 ? void 0 : error.message,
        });
    }
}));
exports.createClient = (0, AsyncHandler_1.AsyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { NAME, ADDRESS, PHONE, EMAIL, ORIGIN, PACKAGE, DESTINATION, CARRIER, TYPEOFSHIPMENT, WEIGHT, SHIPMENTMODE, CARRIERREFERENCENO, PRODUCT, QTY, PAYMENTMODE, TOTALFREIGHT, EXPECTEDDELIVERYDATE, DEPARTURETIME, PICKUPDATE, PICKUPTIME, COMMENTS, PIECETYPE, DESCRIPTION, LENGTH, WIDTH, WEIGHT_KG, HEIGHT_KG, } = req.body;
        const TRACKINGID = `AB-${(0, utils_1.generateRandomNumericString)()}`;
        const createUser = yield ClientModel_1.default.create({
            NAME,
            ADDRESS,
            PHONE,
            EMAIL,
            ORIGIN,
            PACKAGE,
            DESTINATION,
            CARRIER,
            TYPEOFSHIPMENT,
            WEIGHT,
            SHIPMENTMODE,
            CARRIERREFERENCENO,
            PRODUCT,
            QTY,
            PAYMENTMODE,
            TOTALFREIGHT,
            EXPECTEDDELIVERYDATE,
            DEPARTURETIME,
            PICKUPDATE,
            PICKUPTIME,
            COMMENTS,
            PIECETYPE,
            DESCRIPTION,
            LENGTH,
            WIDTH,
            WEIGHT_KG,
            HEIGHT_KG,
            TRACKINGID,
        });
        const DATE = new Date().toLocaleDateString();
        const TIME = new Date().toLocaleTimeString();
        const createShipmentHistory = yield ShipmentHistory_1.default.create({
            DATE,
            TIME,
            LOCATION: ADDRESS,
            STATUS: "On Transit",
            UPDATEDBY: "No Update Yet",
            REMARKS: "No Remarks Yet",
        });
        yield ((_a = createUser === null || createUser === void 0 ? void 0 : createUser.ShipmentHistory) === null || _a === void 0 ? void 0 : _a.push(new mongoose_1.default.Types.ObjectId(createShipmentHistory._id)));
        createUser === null || createUser === void 0 ? void 0 : createUser.save();
        return res.status(MainAppError_1.HTTPCODES.OK).json({
            message: "Created",
        });
    }
    catch (error) {
        return res.status(MainAppError_1.HTTPCODES.BAD_REQUEST).json({
            message: "An Error Occured in createclient",
            error: error.message,
        });
    }
}));
exports.editClient = (0, AsyncHandler_1.AsyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { trackingId, adminId } = req.params;
        const { NAME, ADDRESS, PHONE, EMAIL, ORIGIN, PACKAGE, DESTINATION, CARRIER, TYPEOFSHIPMENT, WEIGHT, SHIPMENTMODE, CARRIERREFERENCENO, PRODUCT, QTY, PAYMENTMODE, TOTALFREIGHT, EXPECTEDDELIVERYDATE, DEPARTURETIME, PICKUPDATE, PICKUPTIME, COMMENTS, PIECETYPE, DESCRIPTION, LENGTH, WIDTH, WEIGHT_KG, STATUS, HEIGHT_KG, REMARKS, } = req.body;
        const getOrder = yield ClientModel_1.default.findOne({ TRACKINGID: trackingId });
        if (!getOrder) {
            return new MainAppError_1.MainAppError({
                message: "Order Not Found",
                httpcode: MainAppError_1.HTTPCODES.NOT_FOUND,
            });
        }
        const createOrder = yield ClientModel_1.default.findByIdAndUpdate(getOrder === null || getOrder === void 0 ? void 0 : getOrder._id, {
            NAME,
            ADDRESS,
            PHONE,
            EMAIL,
            ORIGIN,
            PACKAGE,
            DESTINATION,
            CARRIER,
            TYPEOFSHIPMENT,
            WEIGHT,
            SHIPMENTMODE,
            CARRIERREFERENCENO,
            PRODUCT,
            QTY,
            PAYMENTMODE,
            TOTALFREIGHT,
            EXPECTEDDELIVERYDATE,
            DEPARTURETIME,
            PICKUPDATE,
            PICKUPTIME,
            COMMENTS,
            PIECETYPE,
            DESCRIPTION,
            LENGTH,
            WIDTH,
            WEIGHT_KG,
            HEIGHT_KG,
        }, { new: true });
        const getAdmin = yield userModel_1.default.findById(adminId);
        const getClient = yield ClientModel_1.default.findById(getOrder === null || getOrder === void 0 ? void 0 : getOrder._id);
        function getId() {
            var _a;
            return (_a = getClient === null || getClient === void 0 ? void 0 : getClient.ShipmentHistory) === null || _a === void 0 ? void 0 : _a.map((e) => e === null || e === void 0 ? void 0 : e._id);
        }
        const getShipmentId = yield ShipmentHistory_1.default.findById(getId());
        const DATE = new Date().toLocaleDateString();
        const TIME = new Date().toLocaleTimeString();
        const updateShipment = yield ShipmentHistory_1.default.findByIdAndUpdate(getShipmentId, {
            DATE,
            TIME,
            LOCATION: ADDRESS,
            STATUS,
            UPDATEDBY: getAdmin === null || getAdmin === void 0 ? void 0 : getAdmin.name,
            REMARKS,
        }, { new: true });
        updateShipment === null || updateShipment === void 0 ? void 0 : updateShipment.save();
        createOrder === null || createOrder === void 0 ? void 0 : createOrder.save();
        return res.status(MainAppError_1.HTTPCODES.OK).json({
            message: "updated",
        });
    }
    catch (error) {
        return res.status(MainAppError_1.HTTPCODES.BAD_REQUEST).json({
            message: "An Error Occured in eidtClient",
            error: error.message,
        });
    }
}));
exports.deleteClient = (0, AsyncHandler_1.AsyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const { clientId } = req.params;
        const getClient = yield ClientModel_1.default.findByIdAndDelete(clientId);
        function getId() {
            var _a;
            return (_a = getClient === null || getClient === void 0 ? void 0 : getClient.ShipmentHistory) === null || _a === void 0 ? void 0 : _a.map((e) => e === null || e === void 0 ? void 0 : e._id);
        }
        yield ShipmentHistory_1.default.findByIdAndDelete((_b = getId()) === null || _b === void 0 ? void 0 : _b.toString());
        return res.status(MainAppError_1.HTTPCODES.OK).json({
            message: "deleted",
        });
    }
    catch (error) {
        return res.status(MainAppError_1.HTTPCODES.BAD_REQUEST).json({
            message: "An Error Occured in deleteClient",
            error: error,
        });
    }
}));
