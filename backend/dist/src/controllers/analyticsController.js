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
const catchAsync_1 = require("../utils/catchAsync");
const analyticsService_1 = require("../services/analyticsService");
exports.analyticsController = {
    getAllAnalytics: (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { limit } = req.query;
        // Run all analytics in parallel
        const [totalStudents, studentsByGender, topPerformingStudents, totalTutors, totalPopulation,] = yield Promise.all([
            analyticsService_1.analyticsService.getTotalStudents(),
            analyticsService_1.analyticsService.getStudentsByGender(),
            analyticsService_1.analyticsService.getTopPerformingStudentsFromClass(Number(limit) || 10),
            analyticsService_1.analyticsService.getTotalTutors(),
            analyticsService_1.analyticsService.getTotalPopulation(),
        ]);
        // Combine results into a single object
        const analyticsData = {
            totalStudents,
            studentsByGender,
            topPerformingStudents,
            totalTutors,
            totalPopulation,
        };
        res.status(200).json(analyticsData);
    })),
};
