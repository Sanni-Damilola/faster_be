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
exports.DeleteOrder = exports.EditOrder = exports.CreateOrder = exports.updateAdmin = exports.GetOneOrder = exports.getAdmin = exports.loginAdmin = exports.createAdmin = exports.GetAllOrders = void 0;
const AsyncHandler_1 = require("../MiddleWare/AsyncHandler");
const MainAppError_1 = require("../Utils/MainAppError");
const adminModel_1 = __importDefault(require("../model/adminModel"));
const envV_1 = require("../config/envV");
const orderModel_1 = __importDefault(require("../model/orderModel"));
const ShipmentHistory_1 = __importDefault(require("../model/ShipmentHistory"));
const mongoose_1 = __importDefault(require("mongoose"));
const utils_1 = require("../Utils/utils");
exports.GetAllOrders = (0, AsyncHandler_1.AsyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield orderModel_1.default.find().populate("ShipmentHistory");
        const ordersLength = orders.length;
        const message = ordersLength === 0
            ? "No orders available"
            : "All orders retrieved successfully";
        return res
            .status(MainAppError_1.HTTPCODES.OK)
            .json({ length: ordersLength, message, data: orders });
    }
    catch (error) {
        return (0, utils_1.handleErrorResponse)(error, res);
    }
}));
exports.createAdmin = (0, AsyncHandler_1.AsyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const checkIfExist = yield adminModel_1.default.findOne({
            email: envV_1.EnvironmentVariables === null || envV_1.EnvironmentVariables === void 0 ? void 0 : envV_1.EnvironmentVariables.AdminEmail,
        });
        if (checkIfExist) {
            return next(new MainAppError_1.MainAppError({
                message: "Admin Already Exist",
                httpcode: MainAppError_1.HTTPCODES.BAD_REQUEST,
            }));
        }
        yield adminModel_1.default.create({
            name: envV_1.EnvironmentVariables === null || envV_1.EnvironmentVariables === void 0 ? void 0 : envV_1.EnvironmentVariables.AdminName,
            email: envV_1.EnvironmentVariables === null || envV_1.EnvironmentVariables === void 0 ? void 0 : envV_1.EnvironmentVariables.AdminEmail,
            password: envV_1.EnvironmentVariables === null || envV_1.EnvironmentVariables === void 0 ? void 0 : envV_1.EnvironmentVariables.AdminPassword,
        });
        return res.status(MainAppError_1.HTTPCODES.OK).json({
            message: "Created",
        });
    }
    catch (error) {
        return (0, utils_1.handleErrorResponse)(error, res);
    }
}));
exports.loginAdmin = (0, AsyncHandler_1.AsyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const getUser = yield adminModel_1.default.findOne({ email });
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
        return (0, utils_1.handleErrorResponse)(error, res);
    }
}));
exports.getAdmin = (0, AsyncHandler_1.AsyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const admin = yield adminModel_1.default.findById(id);
        if (!admin) {
            throw new MainAppError_1.MainAppError({
                message: "Admin not found",
                httpcode: MainAppError_1.HTTPCODES.NOT_FOUND,
            });
        }
        return res.status(MainAppError_1.HTTPCODES.OK).json({
            data: admin,
        });
    }
    catch (error) {
        return (0, utils_1.handleErrorResponse)(error, res);
    }
}));
exports.GetOneOrder = (0, AsyncHandler_1.AsyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { trackingId } = req.params;
        const order = yield orderModel_1.default
            .findOne({ TRACKINGID: trackingId })
            .populate("ShipmentHistory");
        if (!order) {
            return next(new MainAppError_1.MainAppError({
                message: "Order not found",
                httpcode: MainAppError_1.HTTPCODES.NOT_FOUND,
            }));
        }
        return res.status(MainAppError_1.HTTPCODES.OK).json({ data: order });
    }
    catch (error) {
        return (0, utils_1.handleErrorResponse)(error, res);
    }
}));
exports.updateAdmin = (0, AsyncHandler_1.AsyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, password, email } = req.body;
        const admin = yield adminModel_1.default.findById(id);
        if (!admin) {
            throw new MainAppError_1.MainAppError({
                message: "Admin not found",
                httpcode: MainAppError_1.HTTPCODES.NOT_FOUND,
            });
        }
        yield adminModel_1.default.findByIdAndUpdate(admin._id, { name, email, password });
        return res.status(MainAppError_1.HTTPCODES.OK).json({ message: "Updated" });
    }
    catch (error) {
        return (0, utils_1.handleErrorResponse)(error, res);
    }
}));
exports.CreateOrder = (0, AsyncHandler_1.AsyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { NAME, ADDRESS, EMAIL, BILL, DESTINATION_NAME, DESTINATION_ADDRESS, DESTINATION_PHONENO, } = req.body;
        const requiredFields = ["NAME", "ADDRESS", "PHONE"];
        const missingFields = requiredFields.filter((field) => !(field in req.body));
        if (missingFields.length > 0) {
            return res.status(MainAppError_1.HTTPCODES.BAD_REQUEST).json({
                error: "Please ensure all required fields are provided.",
            });
        }
        const TRACKINGID = `AB-${(0, utils_1.generateRandomNumericString)()}`;
        const createdOrder = yield orderModel_1.default.create({
            NAME,
            ADDRESS,
            EMAIL,
            TRACKINGID,
            BILL,
            DESTINATION_NAME,
            DESTINATION_ADDRESS,
            DESTINATION_PHONENO,
        });
        const DATE = new Date().toLocaleDateString();
        const TIME = new Date().toLocaleTimeString();
        const createdShipmentHistory = yield ShipmentHistory_1.default.create({
            DATE,
            TIME,
            LOCATION: ADDRESS,
            STATUS: "On Transit",
            UPDATEDBY: "No Update Yet",
            REMARKS: "No Remarks Yet",
        });
        (_a = createdOrder === null || createdOrder === void 0 ? void 0 : createdOrder.ShipmentHistory) === null || _a === void 0 ? void 0 : _a.push(new mongoose_1.default.Types.ObjectId(createdShipmentHistory._id));
        yield (createdOrder === null || createdOrder === void 0 ? void 0 : createdOrder.save());
        return res
            .status(MainAppError_1.HTTPCODES.OK)
            .json({ message: "Order created successfully" });
    }
    catch (error) {
        return (0, utils_1.handleErrorResponse)(error, res);
    }
}));
exports.EditOrder = (0, AsyncHandler_1.AsyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const { trackingId, id } = req.params;
        const { NAME, ADDRESS, EMAIL, BILL, DESTINATION_NAME, DESTINATION_ADDRESS, DESTINATION_PHONENO, STATUS, } = req.body;
        const order = yield orderModel_1.default.findOne({ TRACKINGID: trackingId });
        if (!order) {
            return new MainAppError_1.MainAppError({
                message: "Order not found",
                httpcode: MainAppError_1.HTTPCODES.NOT_FOUND,
            });
        }
        const updatedOrder = yield orderModel_1.default.findByIdAndUpdate(order === null || order === void 0 ? void 0 : order._id, {
            NAME,
            ADDRESS,
            EMAIL,
            BILL,
            DESTINATION_NAME,
            DESTINATION_ADDRESS,
            DESTINATION_PHONENO,
        }, { new: true });
        const admin = yield adminModel_1.default.findById(id);
        const shipmentHistoryIds = (_b = updatedOrder === null || updatedOrder === void 0 ? void 0 : updatedOrder.ShipmentHistory) === null || _b === void 0 ? void 0 : _b.map((e) => e === null || e === void 0 ? void 0 : e._id);
        const shipment = yield ShipmentHistory_1.default.findOneAndUpdate({ _id: { $in: shipmentHistoryIds } }, {
            DATE: new Date().toLocaleDateString(),
            TIME: new Date().toLocaleTimeString(),
            STATUS,
            UPDATEDBY: admin === null || admin === void 0 ? void 0 : admin.name,
        }, { new: true });
        yield (shipment === null || shipment === void 0 ? void 0 : shipment.save());
        yield (updatedOrder === null || updatedOrder === void 0 ? void 0 : updatedOrder.save());
        return res
            .status(MainAppError_1.HTTPCODES.OK)
            .json({ message: "Order updated successfully" });
    }
    catch (error) {
        return (0, utils_1.handleErrorResponse)(error, res);
    }
}));
exports.DeleteOrder = (0, AsyncHandler_1.AsyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const { orderId } = req.params;
        const deletedOrder = yield orderModel_1.default.findByIdAndDelete(orderId);
        if (!deletedOrder) {
            throw new MainAppError_1.MainAppError({
                message: "Order not found",
                httpcode: MainAppError_1.HTTPCODES.NOT_FOUND,
            });
        }
        const shipmentHistoryIds = ((_c = deletedOrder.ShipmentHistory) === null || _c === void 0 ? void 0 : _c.map((e) => e === null || e === void 0 ? void 0 : e._id)) || [];
        if (shipmentHistoryIds.length > 0) {
            yield ShipmentHistory_1.default.deleteMany({ _id: { $in: shipmentHistoryIds } });
        }
        return res
            .status(MainAppError_1.HTTPCODES.OK)
            .json({ message: "Order deleted successfully" });
    }
    catch (error) {
        return res.status(error.httpcode || MainAppError_1.HTTPCODES.BAD_REQUEST).json({
            message: "Error deleting order",
            error: error.message || "Unknown error",
        });
    }
}));
