"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables before importing other modules
dotenv_1.default.config();
const app_1 = __importDefault(require("./app"));
const db_1 = require("./config/db");
const PORT = process.env.PORT || 5000;
// Connect to Database
(0, db_1.connectDB)();
// Start Server
const server = app_1.default.listen(PORT, () => {
    console.log(`Server is running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error(`Unhandled Promise Rejection: ${err.message}`);
    // Close server and exit process
    server.close(() => process.exit(1));
});
//# sourceMappingURL=server.js.map