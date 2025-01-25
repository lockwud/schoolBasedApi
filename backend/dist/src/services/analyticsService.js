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
exports.totalPopulationAnalytics = exports.tutorAnalytics = exports.studentAnalytics = void 0;
const errorHandler_1 = require("../middleware/errorHandler");
const http_status_1 = require("../utils/http-status");
const prisma_1 = __importDefault(require("../utils/prisma"));
const DEFAULT_TOP_STUDENT_LIMIT = 10;
const getTopStudents = (students, limit) => {
    const firstPositionStudent = students.find(student => { var _a; return (_a = student.studentTerminalReport) === null || _a === void 0 ? void 0 : _a.some(report => report.position === 1); });
    const sortedStudents = students.sort((a, b) => {
        const aReport = a.studentTerminalReport[0];
        const bReport = b.studentTerminalReport[0];
        if (aReport.position !== bReport.position) {
            return aReport.position - bReport.position;
        }
        return bReport.totalScore - aReport.totalScore;
    });
    const topStudents = sortedStudents.slice(0, limit);
    if (firstPositionStudent && !topStudents.includes(firstPositionStudent)) {
        topStudents.pop(); // Remove last student to maintain the limit
        topStudents.unshift(firstPositionStudent); // Add first position student
    }
    return topStudents;
};
exports.studentAnalytics = {
    getTotalStudents: () => __awaiter(void 0, void 0, void 0, function* () {
        const totalStudents = yield prisma_1.default.student.count();
        return totalStudents;
    }),
    getStudentsByGender: () => __awaiter(void 0, void 0, void 0, function* () {
        const countByGender = yield prisma_1.default.student.groupBy({
            by: ['gender'],
            _count: {
                _all: true
            }
        });
        return countByGender;
    }),
    getTopPerformingStudentsFromClass: (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (limit = DEFAULT_TOP_STUDENT_LIMIT) {
        try {
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
            return classesWithStudents.map(classData => {
                const topStudents = getTopStudents(classData.student, limit);
                return Object.assign(Object.assign({}, classData), { topPerformingStudents: topStudents });
            });
        }
        catch (error) {
            console.error("Error fetching top-performing students:", error);
            (0, errorHandler_1.throwError)(http_status_1.HttpStatus.INTERNAL_SERVER_ERROR, "Error fetching top-performing students");
        }
    }),
};
exports.tutorAnalytics = {
    getTotalTutors: () => __awaiter(void 0, void 0, void 0, function* () {
        const totalTutors = yield prisma_1.default.tutor.count();
        return totalTutors;
    })
};
exports.totalPopulationAnalytics = {
    Population: () => __awaiter(void 0, void 0, void 0, function* () {
        const sumOfPopulation = (yield prisma_1.default.student.count()) + (yield prisma_1.default.tutor.count());
        return sumOfPopulation;
    })
};
