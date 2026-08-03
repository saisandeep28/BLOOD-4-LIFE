"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeSockets = void 0;
const socket_io_1 = require("socket.io");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const logger_1 = require("../utils/logger");
const initializeSockets = (server) => {
    const io = new socket_io_1.Server(server, {
        cors: {
            origin: config_1.config.clientUrl,
            methods: ['GET', 'POST'],
            credentials: true,
        },
    });
    // Authentication middleware for sockets
    io.use((socket, next) => {
        const token = socket.handshake.auth.token;
        if (!token) {
            return next(new Error('Authentication error'));
        }
        try {
            const decoded = jsonwebtoken_1.default.verify(token, config_1.config.jwt.accessSecret);
            socket.data.user = decoded;
            next();
        }
        catch (err) {
            next(new Error('Authentication error'));
        }
    });
    const notificationsNamespace = io.of('/notifications');
    notificationsNamespace.on('connection', (socket) => {
        const user = socket.data.user;
        logger_1.logger.info(`User ${user.userId} connected to /notifications namespace`);
        // Join a room specific to the user
        socket.join(user.userId);
        socket.on('disconnect', () => {
            logger_1.logger.info(`User ${user.userId} disconnected from /notifications namespace`);
        });
    });
    const requestsNamespace = io.of('/requests');
    requestsNamespace.on('connection', (socket) => {
        logger_1.logger.info(`Client connected to /requests namespace`);
        socket.on('joinRequest', (requestId) => {
            socket.join(requestId);
        });
        socket.on('leaveRequest', (requestId) => {
            socket.leave(requestId);
        });
    });
    return io;
};
exports.initializeSockets = initializeSockets;
//# sourceMappingURL=index.js.map