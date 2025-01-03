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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.forgotPassword = exports.otpVerification = exports.deleteAdmin = exports.updateAdminRecords = exports.getAdminById = exports.getAdminByEmail = exports.getAdmins = exports.login = exports.signUp = void 0;
const http_error_1 = __importDefault(require("../utils/http-error"));
const adminService = __importStar(require("../services/adminServices"));
const http_status_1 = require("../utils/http-status");
const emailTransporter_1 = require("../utils/emailTransporter");
const signUp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const addAdmin = yield adminService.registerAdmin(data);
        res.status(http_status_1.HttpStatus.CREATED).json(addAdmin);
    }
    catch (error) {
        const err = error;
        next(new http_error_1.default(err.status || http_status_1.HttpStatus.INTERNAL_SERVER_ERROR, err.message));
    }
});
exports.signUp = signUp;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const adminLogin = yield adminService.signInAdmin(email, password);
        const otp = (0, emailTransporter_1.generateOtp)();
        yield adminService.updateAdmin(adminLogin.id, { otp, });
        yield (0, emailTransporter_1.sendOtpEmail)(email, otp);
        res.status(http_status_1.HttpStatus.OK).json({ message: "check your email for otp" });
    }
    catch (error) {
        const err = error;
        next(new http_error_1.default(err.status || http_status_1.HttpStatus.INTERNAL_SERVER_ERROR, err.message));
    }
});
exports.login = login;
const getAdmins = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const admins = yield adminService.fetchAllAdmins();
        res.status(http_status_1.HttpStatus.OK).json(admins);
    }
    catch (error) {
        const err = error;
        next(new http_error_1.default(http_status_1.HttpStatus.INTERNAL_SERVER_ERROR, err.message));
    }
});
exports.getAdmins = getAdmins;
const getAdminByEmail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const fetchedAdmin = yield adminService.fetchAdminByEmail(email);
        res.status(http_status_1.HttpStatus.OK).json(fetchedAdmin);
    }
    catch (error) {
        const err = error;
        next(new http_error_1.default(http_status_1.HttpStatus.INTERNAL_SERVER_ERROR, err.message));
    }
});
exports.getAdminByEmail = getAdminByEmail;
const getAdminById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const fetchedAdmin = yield adminService.fetchAdminById(id);
        res.status(http_status_1.HttpStatus.OK).json(fetchedAdmin);
    }
    catch (error) {
        const err = error;
        next(new http_error_1.default(http_status_1.HttpStatus.INTERNAL_SERVER_ERROR, err.message));
    }
});
exports.getAdminById = getAdminById;
const updateAdminRecords = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { data } = req.body;
        const updatedRecord = yield adminService.updateAdmin(id, data);
        res.status(http_status_1.HttpStatus.OK).json(updatedRecord);
    }
    catch (error) {
        const err = error;
        next(new http_error_1.default(http_status_1.HttpStatus.INTERNAL_SERVER_ERROR, err.message));
    }
});
exports.updateAdminRecords = updateAdminRecords;
const deleteAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedAdmin = yield adminService.deleteAdminRecords(id);
        res.status(http_status_1.HttpStatus.OK).json(deletedAdmin);
    }
    catch (error) {
        const err = error;
        next(new http_error_1.default(http_status_1.HttpStatus.INTERNAL_SERVER_ERROR, err.message));
    }
});
exports.deleteAdmin = deleteAdmin;
const otpVerification = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { otp } = req.body;
        const { id } = req.params;
        const token = yield adminService.verifyOtp(id, otp);
        res.status(http_status_1.HttpStatus.OK).json({ message: "verified", token });
    }
    catch (error) {
        const err = error;
        next(new http_error_1.default(http_status_1.HttpStatus.INTERNAL_SERVER_ERROR, err.message));
    }
});
exports.otpVerification = otpVerification;
const forgotPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const passwordResetLink = process.env.PASSWORD_RESET_URL;
        const link = yield process.env.PASSWORD_RESET_URL; // generate password reset link
        const token = yield adminService.forgotPasswordLink(email, link, passwordResetLink);
        res.status(http_status_1.HttpStatus.OK).json({ message: "check email for reset link", token });
    }
    catch (error) {
        const err = error;
        next(new http_error_1.default(http_status_1.HttpStatus.INTERNAL_SERVER_ERROR, err.message));
    }
});
exports.forgotPassword = forgotPassword;
const resetPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { password } = req.body;
        const { token } = req.params;
        yield adminService.resetPassword(password, token);
        res.status(http_status_1.HttpStatus.OK).json("password reset successfully");
    }
    catch (error) {
        const err = error;
        next(new http_error_1.default(http_status_1.HttpStatus.INTERNAL_SERVER_ERROR, err.message));
    }
});
exports.resetPassword = resetPassword;
