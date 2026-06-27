"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const protect = async (req, res, next) => {
    try {
        let token;
        // Check Authorization header for Bearer token
        if (req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
        }
        // Check cookies as fallback (if cookie-parser is used)
        else if (req.cookies && req.cookies.token) {
            token = req.cookies.token;
        }
        if (!token) {
            res.status(401).json({
                success: false,
                message: "Not authorized to access this route. No token provided.",
            });
            return;
        }
        // Verify token
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "your_super_secret_key");
        // Get user from the token
        const user = await User_1.default.findById(decoded.id);
        if (!user) {
            res.status(401).json({
                success: false,
                message: "Not authorized. User not found.",
            });
            return;
        }
        // Attach user to request object
        req.user = user;
        next();
    }
    catch (error) {
        res.status(401).json({
            success: false,
            message: "Not authorized. Invalid or expired token.",
        });
    }
};
exports.protect = protect;
//# sourceMappingURL=authMiddleware.js.map