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
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchTotalPopulation = exports.fetchTotalTutors = exports.fetchTopPerformingStudent = exports.fetchStudentsByGender = exports.fetchTotalStudents = void 0;
const http_status_1 = require("../utils/http-status");
const analyticsService_1 = require("../services/analyticsService");
const catchAsync_1 = require("../utils/catchAsync");
exports.fetchTotalStudents = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const totalStudents = yield analyticsService_1.studentAnalytics.getTotalStudents();
    res.status(http_status_1.HttpStatus.OK).json({ totalStudents });
}));
exports.fetchStudentsByGender = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { gender } = req.query;
    if (typeof gender !== "string" || !["male", "female"].includes(gender)) {
        return res.status(http_status_1.HttpStatus.BAD_REQUEST).json({
            message: "Invalid gender. Expected 'male' or 'female'.",
        });
    }
    const countByGender = yield analyticsService_1.studentAnalytics.getStudentsByGender(gender);
    res.status(http_status_1.HttpStatus.OK).json({ countByGender });
}));
exports.fetchTopPerformingStudent = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const topTenStudents = yield analyticsService_1.studentAnalytics.getTopPerformingStudentsFromClass();
    res.status(http_status_1.HttpStatus.OK).json(topTenStudents);
}));
exports.fetchTotalTutors = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const totalTutors = yield analyticsService_1.tutorAnalytics.getTotalTutors();
    res.status(http_status_1.HttpStatus.OK).json(totalTutors);
}));
exports.fetchTotalPopulation = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const entirePopulation = yield analyticsService_1.totalPopulationAnalytics.Population();
    res.status(http_status_1.HttpStatus.OK).json(entirePopulation);
}));
