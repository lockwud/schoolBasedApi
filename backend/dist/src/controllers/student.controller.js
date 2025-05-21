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
exports.updatePassword = exports.requestPassword = exports.autoDeleteStudent = exports.deleteStudent = exports.updateStudent = exports.fetchStudentById = exports.fetchStudents = exports.login = exports.addStudent = void 0;
const studentService = __importStar(require("../services/student.service"));
const http_status_1 = require("../utils/http-status");
const cloudinary_1 = __importDefault(require("../utils/cloudinary"));
const catchAsync_1 = require("../utils/catchAsync");
exports.addStudent = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
}));
exports.login = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { studentId, password } = req.body;
    const student = yield studentService.login(studentId, password);
    res.status(http_status_1.HttpStatus.ACCEPTED).json({ student });
}));
exports.fetchStudents = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const fetchedStudents = yield studentService.fetchStudents();
    res.status(http_status_1.HttpStatus.OK).json(fetchedStudents);
}));
exports.fetchStudentById = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { studentId } = req.body;
    const fetchedStudent = yield studentService.fetchStudentById(studentId);
}));
exports.updateStudent = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { studentId } = req.body;
    const data = req.body;
    const updatedStudent = yield studentService.updateStudentDetails(studentId, data);
    res.status(http_status_1.HttpStatus.OK).json(updatedStudent);
}));
exports.deleteStudent = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { studentId } = req.body;
    yield studentService.deleteStudents(studentId);
    res.status(http_status_1.HttpStatus.NO_CONTENT).json("student record deleted");
}));
exports.autoDeleteStudent = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const deleteStudent = yield studentService.automaticRemovalOfStudent();
    res.status(http_status_1.HttpStatus.NO_CONTENT).json("student record deleted");
}));
exports.requestPassword = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { studentId } = req.body;
    const password = yield studentService.forgotPassword(studentId);
    res.status(http_status_1.HttpStatus.OK).json("Go to the administration for your password, \n Kindly change password after getting a password from the admin");
}));
exports.updatePassword = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { studentId, oldPassword, password } = req.body;
    yield studentService.changePassword(studentId, oldPassword, password);
    res.status(http_status_1.HttpStatus.OK).json("Password reset successfully");
}));
