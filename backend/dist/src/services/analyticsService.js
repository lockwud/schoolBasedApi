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
exports.analyticsService = void 0;
const prisma_1 = __importDefault(require("../utils/prisma"));
const DEFAULT_TOP_STUDENT_LIMIT = 10;
// Helper function to get top students
const getTopStudents = (students, limit) => {
    // Filter out students without terminal reports
    const validStudents = students.filter((student) => Array.isArray(student.studentTerminalReport) &&
        student.studentTerminalReport.length > 0);
    const firstPositionStudent = validStudents.find((student) => {
        var _a;
        return (_a = student.studentTerminalReport) === null || _a === void 0 ? void 0 : _a.some((report) => report.position === 1);
    });
    const sortedStudents = validStudents.sort((a, b) => {
        const aReport = a.studentTerminalReport[0];
        const bReport = b.studentTerminalReport[0];
        // Add nullish checks for position
        if ((aReport === null || aReport === void 0 ? void 0 : aReport.position) !== (bReport === null || bReport === void 0 ? void 0 : bReport.position)) {
            return ((aReport === null || aReport === void 0 ? void 0 : aReport.position) || Infinity) - ((bReport === null || bReport === void 0 ? void 0 : bReport.position) || Infinity);
        }
        return ((bReport === null || bReport === void 0 ? void 0 : bReport.totalScore) || 0) - ((aReport === null || aReport === void 0 ? void 0 : aReport.totalScore) || 0);
    });
    const topStudents = sortedStudents.slice(0, limit);
    if (firstPositionStudent && !topStudents.includes(firstPositionStudent)) {
        topStudents.pop();
        topStudents.unshift(firstPositionStudent);
    }
    return topStudents;
};
// Analytics service functions
exports.analyticsService = {
    getTotalStudents: () => __awaiter(void 0, void 0, void 0, function* () {
        return yield prisma_1.default.student.count();
    }),
    getStudentsByGender: () => __awaiter(void 0, void 0, void 0, function* () {
        return yield prisma_1.default.student.groupBy({
            by: ["gender"],
            _count: {
                _all: true,
            },
        });
    }),
    getTopPerformingStudentsFromClass: (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (limit = DEFAULT_TOP_STUDENT_LIMIT) {
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
        // Log the data to debug potential issues
        console.log("Classes with Students:", JSON.stringify(classesWithStudents, null, 2));
        return classesWithStudents.map((classData) => {
            // Filter students with valid reports
            const validStudents = classData.student.filter((student) => Array.isArray(student.studentTerminalReport) &&
                student.studentTerminalReport.length > 0);
            return Object.assign(Object.assign({}, classData), { topPerformingStudents: getTopStudents(validStudents, limit) });
        });
    }),
    getTotalTutors: () => __awaiter(void 0, void 0, void 0, function* () {
        return yield prisma_1.default.tutor.count();
    }),
    getTotalPopulation: () => __awaiter(void 0, void 0, void 0, function* () {
        const [studentCount, tutorCount] = yield Promise.all([
            prisma_1.default.student.count(),
            prisma_1.default.tutor.count(),
        ]);
        return studentCount + tutorCount;
    }),
};
