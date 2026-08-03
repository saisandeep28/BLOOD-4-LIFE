"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = exports.app = exports.io = void 0;
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const config_1 = require("./config");
const database_1 = require("./config/database");
const sockets_1 = require("./sockets");
const errorHandler_1 = require("./middleware/errorHandler");
const rateLimiter_1 = require("./middleware/rateLimiter");
const auth_routes_1 = __importDefault(require("./modules/auth/auth.routes"));
const requests_routes_1 = __importDefault(require("./modules/requests/requests.routes"));
const inventory_routes_1 = __importDefault(require("./modules/inventory/inventory.routes"));
const search_routes_1 = __importDefault(require("./modules/search/search.routes"));
const app = (0, express_1.default)();
exports.app = app;
const server = http_1.default.createServer(app);
exports.server = server;
// Initialize Socket.io
exports.io = (0, sockets_1.initializeSockets)(server);
// Connect to Database
(0, database_1.connectDB)();
// Middleware
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({ origin: config_1.config.clientUrl, credentials: true }));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use(rateLimiter_1.apiLimiter);
// Routes
app.use('/api/v1/auth', auth_routes_1.default);
app.use('/api/v1/requests', requests_routes_1.default);
app.use('/api/v1/inventory', inventory_routes_1.default);
app.use('/api/v1/search', search_routes_1.default);
// Basic health check
app.get('/health', (req, res) => {
    res.status(200).json({ success: true, message: 'Server is healthy' });
});
// Global Error Handler
app.use(errorHandler_1.errorHandler);
// Start Server
const PORT = config_1.config.port || 5000;
server.listen(PORT, () => {
    console.log(`Server running in ${config_1.config.env} mode on port ${PORT}`);
});
//# sourceMappingURL=index.js.map