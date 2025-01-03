"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeRole = exports.setInvalidToken = exports.signToken = exports.authenticateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const http_error_1 = __importDefault(require("./http-error"));
const http_status_1 = require("./http-status");
const authenticateJWT = (req, res, next) => {
    const authHeader = req.header("Authorization");
    const token = authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(" ")[1];
    if (token) {
        jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return next(new http_error_1.default(http_status_1.HttpStatus.FORBIDDEN, "Invalid token"));
            }
            // Attach the user to the request based on role
            if (decoded && decoded.role === "student") {
                req.student = decoded;
            }
            else if (decoded && decoded.role === "tutor") {
                req.tutor = decoded;
            }
            else if (decoded && decoded.role === "admin") {
                req.admin = decoded;
            }
            next();
        });
    }
    else {
        next(new http_error_1.default(http_status_1.HttpStatus.FORBIDDEN, "No token found"));
    }
};
exports.authenticateJWT = authenticateJWT;
// Function to sign a JWT token with the student payload
const signToken = (payload) => {
    if (!process.env.JWT_SECRET || !process.env.JWT_EXPIRES_IN) {
        throw new http_error_1.default(http_status_1.HttpStatus.INTERNAL_SERVER_ERROR, "JWT configuration is missing");
    }
    return jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};
exports.signToken = signToken;
// Function to create a short-lived invalid token
const setInvalidToken = () => {
    if (!process.env.JWT_SECRET) {
        throw new http_error_1.default(http_status_1.HttpStatus.INTERNAL_SERVER_ERROR, "JWT secret is missing");
    }
    return jsonwebtoken_1.default.sign({ logout: "logout" }, process.env.JWT_SECRET, {
        expiresIn: "30s", // Short-lived token
    });
};
exports.setInvalidToken = setInvalidToken;
const authorizeRole = (allowedRoles) => {
    return (req, res, next) => {
        const user = req.student || req.tutor || req.admin || req.guardian;
        if (!user || !allowedRoles.includes(user.role)) {
            return next(new http_error_1.default(http_status_1.HttpStatus.FORBIDDEN, "Access denied"));
        }
        next();
    };
};
exports.authorizeRole = authorizeRole;
