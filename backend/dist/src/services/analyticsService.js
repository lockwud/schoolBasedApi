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
exports.tutorAnalytics = exports.studentAnalytics = void 0;
const prisma_1 = __importDefault(require("../utils/prisma"));
exports.studentAnalytics = {
    getTotalStudents: () => __awaiter(void 0, void 0, void 0, function* () {
        const totalStudents = yield prisma_1.default.student.count();
        return totalStudents;
    }),
    getStudentsByGender: (gender) => __awaiter(void 0, void 0, void 0, function* () {
        const countByGender = yield prisma_1.default.student.count({
            where: { gender },
        });
        return countByGender;
    }),
    getTopPerformingStudentsFromClass: (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (limit = 10) {
        const classesWithStudents = yield prisma_1.default.classes.findMany({
            include: {
                student: {
                    include: {
                        studentTerminalReport: {
                            select: {
                                position: true,
                                totalScore: true,
                            },
                        },
                    },
                },
            },
        });
        const adjustedResults = classesWithStudents.map((classData) => {
            const allStudents = classData.student;
            // Ensure the first position student is included
            const firstPositionStudent = allStudents.find((student) => {
                var _a;
                return (_a = student.studentTerminalReport) === null || _a === void 0 ? void 0 : _a.some((report) => report.position === 1);
            });
            // Sort students by position and totalScore
            const sortedStudents = allStudents.sort((a, b) => {
                const aReport = a.studentTerminalReport[0];
                const bReport = b.studentTerminalReport[0];
                if (aReport.position !== bReport.position) {
                    return aReport.position - bReport.position;
                }
                return bReport.totalScore - aReport.totalScore;
            });
            // Take top students based on the limit
            const topStudents = sortedStudents.slice(0, limit);
            // Ensure the first position student is part of the results
            if (firstPositionStudent && !topStudents.includes(firstPositionStudent)) {
                topStudents.pop(); // Remove the last student if limit is reached
                topStudents.unshift(firstPositionStudent); // Add the first position student at the beginning
            }
            return Object.assign(Object.assign({}, classData), { topPerformingStudents: topStudents });
        });
        return adjustedResults;
    })
};
exports.tutorAnalytics = {
    getTotalTutors: () => __awaiter(void 0, void 0, void 0, function* () {
    })
};
