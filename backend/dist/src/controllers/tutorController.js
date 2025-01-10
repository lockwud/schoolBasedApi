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
exports.deleteTutorRecords = exports.otpVerification = exports.resetPassword = exports.sendPasswordResetLink = exports.deleteTutor = exports.updateTutorDetails = exports.getTutorByEmail = exports.getTtutorById = exports.getTutors = exports.login = exports.signUp = void 0;
const http_error_1 = __importDefault(require("../utils/http-error"));
const tutorService = __importStar(require("../services/tutorServices"));
const http_status_1 = require("../utils/http-status");
const emailTransporter_1 = require("../utils/emailTransporter");
const signUp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const addTutor = yield tutorService.addTutor(data);
        res.status(http_status_1.HttpStatus.CREATED).json(addTutor);
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
        const tutorLogin = yield tutorService.signIn(email, password);
        const otp = (0, emailTransporter_1.generateOtp)();
        yield tutorService.updateTutor(tutorLogin.id, { otp, });
        yield (0, emailTransporter_1.sendOtpEmail)(email, otp);
        res.status(http_status_1.HttpStatus.OK).json({ message: "check your email for otp" });
    }
    catch (error) {
        const err = error;
        next(new http_error_1.default(err.status || http_status_1.HttpStatus.INTERNAL_SERVER_ERROR, err.message));
    }
});
exports.login = login;
const getTutors = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tutors = yield tutorService.fetchTutors();
        res.status(http_status_1.HttpStatus.OK).json(tutors);
    }
    catch (error) {
        const err = error;
        next(new http_error_1.default(err.status || http_status_1.HttpStatus.INTERNAL_SERVER_ERROR, err.message));
    }
});
exports.getTutors = getTutors;
const getTtutorById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const fetchedTutor = yield tutorService.fetchTutorById(id);
        res.status(http_status_1.HttpStatus.OK).json({ fetchedTutor });
    }
    catch (error) {
        const err = error;
        next(new http_error_1.default(err.status || http_status_1.HttpStatus.INTERNAL_SERVER_ERROR, err.message));
    }
});
exports.getTtutorById = getTtutorById;
const getTutorByEmail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const fetchedTutor = yield tutorService.fetchTutorByEmail(email);
        res.status(http_status_1.HttpStatus.OK).json({ fetchedTutor });
    }
    catch (error) {
        const err = error;
        next(new http_error_1.default(err.status || http_status_1.HttpStatus.INTERNAL_SERVER_ERROR, err.message));
    }
});
exports.getTutorByEmail = getTutorByEmail;
const updateTutorDetails = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { data } = req.body;
        const updatedTutor = yield tutorService.updateTutor(id, data);
        res.status(http_status_1.HttpStatus.OK).json(updatedTutor);
    }
    catch (error) {
        const err = error;
        next(new http_error_1.default(err.status || http_status_1.HttpStatus.INTERNAL_SERVER_ERROR, err.message));
    }
});
exports.updateTutorDetails = updateTutorDetails;
const deleteTutor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedTutor = yield tutorService.deleteTutor(id);
        res.status(http_status_1.HttpStatus.OK).json(deletedTutor);
    }
    catch (error) {
        const err = error;
        next(new http_error_1.default(err.status || http_status_1.HttpStatus.INTERNAL_SERVER_ERROR, err.message));
    }
});
exports.deleteTutor = deleteTutor;
const sendPasswordResetLink = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const passwordResetLink = process.env.PASSWORD_RESET_URL;
        const link = yield process.env.PASSWORD_RESET_URL; // generate password reset link
        const token = yield tutorService.forgotPasswordLink(email, link, passwordResetLink);
        res.status(http_status_1.HttpStatus.OK).json({ message: 'Password reset link sent', token });
    }
    catch (error) {
        const err = error;
        next(new http_error_1.default(err.status || http_status_1.HttpStatus.INTERNAL_SERVER_ERROR, err.message));
    }
});
exports.sendPasswordResetLink = sendPasswordResetLink;
const resetPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { password } = req.body;
        const { token } = req.params;
        const fetchedTutor = yield tutorService.resetPassword(password, token);
        res.status(http_status_1.HttpStatus.OK).json({ message: 'Password reset successful' });
    }
    catch (error) {
        const err = error;
        next(new http_error_1.default(err.status || http_status_1.HttpStatus.INTERNAL_SERVER_ERROR, err.message));
    }
});
exports.resetPassword = resetPassword;
const otpVerification = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, otp } = req.body;
        const token = yield tutorService.verifyOtp(email, otp);
        res.status(http_status_1.HttpStatus.OK).json({ message: 'OTP verified', token });
    }
    catch (error) {
        const err = error;
        next(new http_error_1.default(err.status || http_status_1.HttpStatus.INTERNAL_SERVER_ERROR, err.message));
    }
});
exports.otpVerification = otpVerification;
const deleteTutorRecords = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedTutorRecords = yield tutorService.deleteTutor(id);
        res.status(http_status_1.HttpStatus.OK).json(deletedTutorRecords);
    }
    catch (error) {
        const err = error;
        next(new http_error_1.default(err.status || http_status_1.HttpStatus.INTERNAL_SERVER_ERROR, err.message));
    }
});
exports.deleteTutorRecords = deleteTutorRecords;
