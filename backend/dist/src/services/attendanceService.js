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
exports.fetchAttendanceRecords = exports.createAttendance = void 0;
const errorHandler_1 = require("../middleware/errorHandler");
const http_status_1 = require("../utils/http-status");
const prisma_1 = __importDefault(require("../utils/prisma"));
const attendanceValidator_1 = require("../validators/attendanceValidator");
const createAttendance = (attendanceData) => __awaiter(void 0, void 0, void 0, function* () {
    const dataArray = Array.isArray(attendanceData) ? attendanceData : [attendanceData]; // Ensure it's an array
    // Validate each attendance record
    const errors = [];
    for (const data of dataArray) {
        const validation = attendanceValidator_1.attendanceSchema.safeParse(data);
        if (!validation.success) {
            const validationErrors = validation.error.issues.map(({ message, path }) => `${path}: ${message}`);
            errors.push(...validationErrors);
        }
    }
    if (errors.length > 0) {
        (0, errorHandler_1.throwError)(http_status_1.HttpStatus.BAD_REQUEST, errors.join(". "));
    }
    // Check for duplicates
    const duplicateRecords = yield prisma_1.default.attendance.findMany({
        where: {
            OR: dataArray.map((data) => ({
                studentId: data.studentId,
                date: data.date.toISOString(),
            })),
        },
    });
    if (duplicateRecords.length > 0) {
        (0, errorHandler_1.throwError)(http_status_1.HttpStatus.CONFLICT, "Some attendance records already exist for the given student(s) and date(s)");
    }
    const newAttendances = yield prisma_1.default.attendance.createMany({
        data: Object.assign({}, dataArray),
        skipDuplicates: true,
    });
    return { count: newAttendances.count };
});
exports.createAttendance = createAttendance;
const fetchAttendanceRecords = () => __awaiter(void 0, void 0, void 0, function* () {
    const allAttendances = yield prisma_1.default.attendance.findMany();
    return allAttendances;
});
exports.fetchAttendanceRecords = fetchAttendanceRecords;
