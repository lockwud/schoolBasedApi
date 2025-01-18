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
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.forgotPassword = exports.otpVerification = exports.deleteAdmin = exports.updateAdminRecords = exports.getAdminById = exports.getAdminByEmail = exports.getAdmins = exports.login = exports.signUp = void 0;
const adminService = __importStar(require("../services/adminServices"));
const http_status_1 = require("../utils/http-status");
const emailTransporter_1 = require("../utils/emailTransporter");
const catchAsync_1 = require("../utils/catchAsync");
exports.signUp = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const addAdmin = yield adminService.registerAdmin(data);
    res.status(http_status_1.HttpStatus.CREATED).json({ addAdmin });
}));
exports.login = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const adminLogin = yield adminService.signInAdmin(email, password);
    const otp = (0, emailTransporter_1.generateOtp)();
    yield adminService.updateAdmin(adminLogin.id, { otp, });
    yield (0, emailTransporter_1.sendOtpEmail)(email, otp);
    res.status(http_status_1.HttpStatus.OK).json({ message: "check your email for otp" });
}));
exports.getAdmins = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const admins = yield adminService.fetchAllAdmins();
    res.status(http_status_1.HttpStatus.OK).json(admins);
}));
exports.getAdminByEmail = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const fetchedAdmin = yield adminService.fetchAdminByEmail(email);
    res.status(http_status_1.HttpStatus.OK).json(fetchedAdmin);
}));
exports.getAdminById = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const fetchedAdmin = yield adminService.fetchAdminById(id);
    res.status(http_status_1.HttpStatus.OK).json(fetchedAdmin);
}));
exports.updateAdminRecords = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { data } = req.body;
    const updatedRecord = yield adminService.updateAdmin(id, data);
    res.status(http_status_1.HttpStatus.OK).json(updatedRecord);
}));
exports.deleteAdmin = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const deletedAdmin = yield adminService.deleteAdminRecords(id);
    res.status(http_status_1.HttpStatus.OK).json(deletedAdmin);
}));
exports.otpVerification = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, otp } = req.body;
    const token = yield adminService.verifyOtp(email, otp);
    res.status(http_status_1.HttpStatus.OK).json({ message: "verified", token });
}));
exports.forgotPassword = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const passwordResetLink = process.env.PASSWORD_RESET_URL;
    const link = yield process.env.PASSWORD_RESET_URL; // generate password reset link
    const token = yield adminService.forgotPasswordLink(email, link, passwordResetLink);
    res.status(http_status_1.HttpStatus.OK).json({ message: "check email for reset link", token });
}));
exports.resetPassword = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { password } = req.body;
    const { token } = req.params;
    yield adminService.resetPassword(password, token);
    res.status(http_status_1.HttpStatus.OK).json("password reset successfully");
}));
