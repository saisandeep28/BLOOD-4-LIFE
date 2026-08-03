"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendError = exports.sendSuccess = void 0;
const sendSuccess = (res, data, statusCode = 200, meta) => {
    const response = {
        success: true,
        data,
        error: null,
        meta
    };
    res.status(statusCode).json(response);
};
exports.sendSuccess = sendSuccess;
const sendError = (res, error, statusCode = 400) => {
    const response = {
        success: false,
        data: null,
        error
    };
    res.status(statusCode).json(response);
};
exports.sendError = sendError;
//# sourceMappingURL=apiResponse.js.map