"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const orderSchema = new mongoose_1.Schema({
    NAME: {
        type: String,
    },
    ADDRESS: {
        type: String,
    },
    PHONE: {
        type: String,
    },
    EMAIL: {
        type: String,
    },
    ORIGIN: {
        type: String,
    },
    PACKAGE: {
        type: String,
    },
    DESTINATION: {
        type: String,
    },
    CARRIER: {
        type: String,
    },
    TYPEOFSHIPMENT: {
        type: String,
    },
    WEIGHT: {
        type: String,
    },
    SHIPMENTMODE: {
        type: String,
    },
    CARRIERREFERENCENO: {
        type: String,
    },
    PRODUCT: {
        type: String,
    },
    QTY: {
        type: String,
    },
    PAYMENTMODE: {
        type: String,
    },
    TOTALFREIGHT: {
        type: String,
    },
    EXPECTEDDELIVERYDATE: {
        type: String,
    },
    DEPARTURETIME: {
        type: String,
    },
    PICKUPDATE: {
        type: String,
    },
    PICKUPTIME: {
        type: String,
    },
    COMMENTS: {
        type: String,
    },
    TRACKINGID: String,
    PIECETYPE: String,
    DESCRIPTION: String,
    LENGTH: String,
    WIDTH: String,
    HEIGHT_KG: String,
    WEIGHT_KG: String,
    ShipmentHistory: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "shipment",
        },
    ],
}, { timestamps: true });
const orderModels = (0, mongoose_1.model)("orders", orderSchema);
exports.default = orderModels;
