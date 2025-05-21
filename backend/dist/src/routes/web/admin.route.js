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
Object.defineProperty(exports, "__esModule", { value: true });
const validate_payload_1 = require("../../middleware/validate-payload");
const express_1 = require("express");
const admin = __importStar(require("../../controllers/admin.controller"));
const jsonwebtoken_1 = require("../../utils/jsonwebtoken");
const adminRoute = (0, express_1.Router)();
adminRoute.post("/signup", (0, validate_payload_1.validatePayload)('admin'), admin.signUp);
adminRoute.post("/login", admin.login);
adminRoute.post("/verifyOtp", admin.otpVerification);
adminRoute.post("/forgotPassword", admin.forgotPassword);
adminRoute.put("/resetPassword/:token", admin.resetPassword);
adminRoute.get("/", 
// authenticateJWT,
// authorizeRole(["admin"]),
admin.getAdmins);
adminRoute.get("/:id", jsonwebtoken_1.authenticateJWT, (0, jsonwebtoken_1.authorizeRole)(["admin"]), admin.getAdminById);
adminRoute.get("/email", jsonwebtoken_1.authenticateJWT, (0, jsonwebtoken_1.authorizeRole)(["admin"]), admin.getAdminByEmail);
adminRoute.put("/update/:id", jsonwebtoken_1.authenticateJWT, (0, jsonwebtoken_1.authorizeRole)(["admin"]), admin.updateAdminRecords);
adminRoute.delete("/delete/:id", jsonwebtoken_1.authenticateJWT, (0, jsonwebtoken_1.authorizeRole)(["admin"]), admin.deleteAdmin);
exports.default = adminRoute;
