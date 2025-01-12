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
exports.updatePassword = exports.requestPassword = exports.autoDeleteStudent = exports.deleteStudent = exports.updateStudent = exports.fetchStudentById = exports.fetchStudents = exports.addStudent = void 0;
const http_error_1 = __importDefault(require("../utils/http-error"));
const studentService = __importStar(require("../services/studentServices"));
const http_status_1 = require("../utils/http-status");
const cloudinary_1 = __importDefault(require("../utils/cloudinary"));
// import { generateOtp, sendOtpEmail } from '../utils/emailTransporter';
const addStudent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const photo = req.file ? req.file.path : undefined;
        const picture = {
            photoUrl: "",
            photoKey: "",
        };
        if (photo) {
            const uploaded = yield cloudinary_1.default.uploader.upload(photo, {
                folder: "students/",
            });
            picture.photoUrl = uploaded.secure_url;
            picture.photoKey = uploaded.public_id;
        }
        const newStudent = yield studentService.registerStudent(data, picture);
        res.status(http_status_1.HttpStatus.CREATED).json(newStudent);
    }
    catch (error) {
        const err = error;
        next(new http_error_1.default(err.status || http_status_1.HttpStatus.INTERNAL_SERVER_ERROR, err.message));
    }
});
exports.addStudent = addStudent;
const fetchStudents = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fetchedStudents = yield studentService.fetchStudents();
        res.status(http_status_1.HttpStatus.OK).json(fetchedStudents);
    }
    catch (error) {
        const err = error;
        next(new http_error_1.default(http_status_1.HttpStatus.INTERNAL_SERVER_ERROR, err.message));
    }
});
exports.fetchStudents = fetchStudents;
const fetchStudentById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { studentId } = req.body;
        const fetchedStudent = yield studentService.fetchStudentById(studentId);
        res.status(http_status_1.HttpStatus.OK).json(fetchedStudent);
    }
    catch (error) {
        const err = error;
        next(new http_error_1.default(http_status_1.HttpStatus.INTERNAL_SERVER_ERROR, err.message));
    }
});
exports.fetchStudentById = fetchStudentById;
const updateStudent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { studentId } = req.body;
        const data = req.body;
        const updatedStudent = yield studentService.updateStudentDetails(studentId, data);
        res.status(http_status_1.HttpStatus.OK).json(updatedStudent);
    }
    catch (error) {
        const err = error;
        next(new http_error_1.default(http_status_1.HttpStatus.INTERNAL_SERVER_ERROR, err.message));
    }
});
exports.updateStudent = updateStudent;
const deleteStudent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { studentId } = req.body;
        yield studentService.deleteStudents(studentId);
        res.status(http_status_1.HttpStatus.NO_CONTENT).json("student record deleted");
    }
    catch (error) {
        const err = error;
        next(new http_error_1.default(http_status_1.HttpStatus.INTERNAL_SERVER_ERROR, err.message));
    }
});
exports.deleteStudent = deleteStudent;
const autoDeleteStudent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleteStudent = yield studentService.automaticRemovalOfStudent();
        res.status(http_status_1.HttpStatus.NO_CONTENT).json("student record deleted");
    }
    catch (error) {
        const err = error;
        next(new http_error_1.default(http_status_1.HttpStatus.INTERNAL_SERVER_ERROR, err.message));
    }
});
exports.autoDeleteStudent = autoDeleteStudent;
const requestPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { studentId } = req.body;
        const password = yield studentService.forgotPassword(studentId);
        res.status(http_status_1.HttpStatus.OK).json("Go to the administration for your password, \n Kindly change password after getting a password from the admin");
    }
    catch (error) {
        const err = error;
        next(new http_error_1.default(http_status_1.HttpStatus.INTERNAL_SERVER_ERROR, err.message));
    }
});
exports.requestPassword = requestPassword;
const updatePassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { studentId, oldPassword, password } = req.body;
        yield studentService.changePassword(studentId, oldPassword, password);
        res.status(http_status_1.HttpStatus.OK).json("Password reset successfully");
    }
    catch (error) {
        const err = error;
        next(new http_error_1.default(http_status_1.HttpStatus.INTERNAL_SERVER_ERROR, err.message));
    }
});
exports.updatePassword = updatePassword;
