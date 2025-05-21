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
exports.analyticsController = void 0;
const http_status_1 = require("../utils/http-status");
const catchAsync_1 = require("../utils/catchAsync");
const analytics_service_1 = require("../services/analytics.service");
exports.analyticsController = {
    getAllAnalytics: (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { limit } = req.query;
        // Run all analytics in parallel
        const [totalStudents, studentsByGender, topPerformingStudents, totalTutors, totalPopulation,] = yield Promise.all([
            analytics_service_1.analyticsService.getTotalStudents(),
            analytics_service_1.analyticsService.getStudentsByGender(),
            analytics_service_1.analyticsService.getTopPerformingStudentsFromClass(Number(limit) || 10),
            analytics_service_1.analyticsService.getTotalTutors(),
            analytics_service_1.analyticsService.getTotalPopulation(),
        ]);
        // Combine results into a single object
        const analyticsData = {
            totalStudents,
            studentsByGender,
            topPerformingStudents,
            totalTutors,
            totalPopulation,
        };
        res.status(http_status_1.HttpStatus.OK).json(analyticsData);
    })),
};
