"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsyncHandler = void 0;
const AsyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
exports.AsyncHandler = AsyncHandler;
