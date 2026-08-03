"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const index_1 = require("./index");
const connectDB = async () => {
    try {
        console.log(`Connecting to MongoDB...`);
        await mongoose_1.default.connect(index_1.config.mongoUri);
        console.log(`MongoDB Connected successfully`);
    }
    catch (error) {
        console.error(`Error connecting to MongoDB:`, error);
        process.exit(1);
    }
};
exports.connectDB = connectDB;
mongoose_1.default.connection.on('disconnected', () => {
    console.log('MongoDB disconnected');
});
mongoose_1.default.connection.on('error', (err) => {
    console.error('MongoDB error', err);
});
//# sourceMappingURL=database.js.map