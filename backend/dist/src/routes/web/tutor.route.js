"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validate_payload_1 = require("../../middleware/validate-payload");
const express_1 = require("express");
const tutor = __importStar(require("../../controllers/tutor.controller"));
const jsonwebtoken_1 = require("../../utils/jsonwebtoken");
const tutorRoute = (0, express_1.Router)();
// All enpoint for admin tutor relation
tutorRoute.post("/admin/signup", (0, validate_payload_1.validatePayload)('tutor'), 
// authenticateJWT,
// authorizeRole(["admin"]),
tutor.signUp);
// All enpoint for tutor self registration and crud
tutorRoute.post("/signup", (0, validate_payload_1.validatePayload)('tutor'), tutor.signUp);
tutorRoute.post("/login", tutor.login);
tutorRoute.post("/auth/verifyOtp", tutor.otpVerification);
tutorRoute.get("/", 
// authenticateJWT,
// authorizeRole(["admin", "tutor"]),
tutor.getTutors);
const getTutorByIdRateLimiter = (0, express_rate_limit_1.default)({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 10, // Limit each IP to 10 requests per `window` (here, per minute)
    message: "Too many requests to fetch tutor details from this IP, please try again after a minute."
});
tutorRoute.get("/:id", getTutorByIdRateLimiter, jsonwebtoken_1.authenticateJWT, (0, jsonwebtoken_1.authorizeRole)(["admin", "tutor"]), tutor.getTtutorById);
tutorRoute.get("/email", jsonwebtoken_1.authenticateJWT, (0, jsonwebtoken_1.authorizeRole)(["admin", "tutor"]), tutor.getTutorByEmail);
const updateTutorRateLimiter = (0, express_rate_limit_1.default)({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 10, // Limit each IP to 10 requests per `window` (here, per minute)
    message: "Too many update requests from this IP, please try again after a minute."
});
tutorRoute.put("/update/:id", updateTutorRateLimiter, jsonwebtoken_1.authenticateJWT, (0, jsonwebtoken_1.authorizeRole)(["admin", "tutor"]), tutor.updateTutorDetails);
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const deleteTutorRateLimiter = (0, express_rate_limit_1.default)({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 10, // Limit each IP to 10 requests per `window` (here, per minute)
    message: "Too many delete requests from this IP, please try again after a minute."
});
tutorRoute.delete("/delete/:id", deleteTutorRateLimiter, jsonwebtoken_1.authenticateJWT, (0, jsonwebtoken_1.authorizeRole)(["admin", "tutor"]), tutor.deleteTutor);
exports.default = tutorRoute;
