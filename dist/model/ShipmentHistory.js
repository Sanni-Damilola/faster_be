"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const packagesSchema = new mongoose_1.Schema({
    DATE: {
        type: String,
    },
    TIME: {
        type: String,
    },
    LOCATION: {
        type: String,
    },
    STATUS: {
        type: String,
    },
    UPDATEDBY: {
        type: String,
    },
    REMARKS: {
        type: String,
    },
}, { timestamps: true });
const shipmentModels = (0, mongoose_1.model)("shipment", packagesSchema);
exports.default = shipmentModels;
