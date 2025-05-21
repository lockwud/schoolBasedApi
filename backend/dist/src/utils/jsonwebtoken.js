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
            else if (decoded && decoded.role === "guardian") {
                req.guardian = decoded;
            }
            else if (decoded && decoded.role === "parent") {
                req.parent = decoded;
            }
            else if (decoded && decoded.role === "superAdmin") {
                req.superAdmin = decoded;
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
    const secret = process.env.JWT_SECRET;
    const expiresIn = process.env.JWT_EXPIRES_IN;
    if (!secret || !expiresIn) {
        throw new http_error_1.default(http_status_1.HttpStatus.INTERNAL_SERVER_ERROR, "JWT configuration is missing");
    }
    const options = { expiresIn: expiresIn };
    return jsonwebtoken_1.default.sign(payload, secret, options);
};
exports.signToken = signToken;
// Function to create a short-lived invalid token
const setInvalidToken = () => {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new http_error_1.default(http_status_1.HttpStatus.INTERNAL_SERVER_ERROR, "JWT secret is missing");
    }
    const payload = { logout: "logout" };
    const options = { expiresIn: "1h" };
    return jsonwebtoken_1.default.sign(payload, secret, options);
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
