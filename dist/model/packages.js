"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const packagesSchema = new mongoose_1.Schema({
    PIECETYPE: {
        type: String,
    },
    DESCRIPTION: {
        type: String,
    },
    LENGTH: {
        type: String,
    },
    WIDTH: {
        type: String,
    },
    HEIGHT_KG: {
        type: String,
    },
    WEIGHT_KG: {
        type: String,
    },
}, { timestamps: true });
const packagesModels = (0, mongoose_1.model)("packages", packagesSchema);
exports.default = packagesModels;
