"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const adminSchema = new mongoose_1.Schema({
    email: {
        type: String,
        unique: true,
        required: [true, "Your email is required"],
    },
    password: {
        type: String,
        required: [true, "Your password is required"],
    },
    name: {
        type: String,
        required: [true, "Your Name is required"],
    },
}, { timestamps: true });
const adminModels = (0, mongoose_1.model)("admins", adminSchema);
exports.default = adminModels;
