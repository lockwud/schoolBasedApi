"use strict";
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
exports.fetchStudentsByGender = exports.fetchTotalStudents = void 0;
const http_error_1 = __importDefault(require("../utils/http-error"));
const http_status_1 = require("../utils/http-status");
const analyticsService_1 = require("../services/analyticsService");
const fetchTotalStudents = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const totalStudents = yield analyticsService_1.studentAnalytics.getTotalStudents();
        res.status(http_status_1.HttpStatus.OK).json({ totalStudents });
    }
    catch (error) {
        const err = error;
        next(new http_error_1.default(err.status || http_status_1.HttpStatus.INTERNAL_SERVER_ERROR, err.message));
    }
});
exports.fetchTotalStudents = fetchTotalStudents;
const fetchStudentsByGender = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { gender } = req.query;
        // Validate the `gender` query parameter
        if (typeof gender !== "string" || !["male", "female"].includes(gender)) {
            return res.status(http_status_1.HttpStatus.BAD_REQUEST).json({
                message: "Invalid gender. Expected 'male' or 'female'.",
            });
        }
        // Use the validated `gender` value
        const countByGender = yield analyticsService_1.studentAnalytics.getStudentsByGender(gender);
        res.status(http_status_1.HttpStatus.OK).json({ countByGender });
    }
    catch (error) {
        const err = error;
        next(new http_error_1.default(err.status || http_status_1.HttpStatus.INTERNAL_SERVER_ERROR, err.message));
    }
});
exports.fetchStudentsByGender = fetchStudentsByGender;
