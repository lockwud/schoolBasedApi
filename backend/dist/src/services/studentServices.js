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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePassword = exports.forgotPassword = exports.login = exports.automaticRemovalOfStudent = exports.deleteStudents = exports.updateStudentDetails = exports.fetchStudentByClass = exports.fetchStudentById = exports.fetchStudents = exports.registerStudent = void 0;
const http_error_1 = __importDefault(require("../utils/http-error"));
const http_status_1 = require("../utils/http-status");
const prisma_1 = __importDefault(require("../utils/prisma"));
const bcrypt_1 = require("../utils/bcrypt");
const jsonwebtoken_1 = require("../utils/jsonwebtoken");
const studentValidator_1 = require("../validators/studentValidator");
const referralCodeGenerator_1 = require("../utils/referralCodeGenerator");
const registerStudent = (data, picture) => __awaiter(void 0, void 0, void 0, function* () {
    const validateStudentData = studentValidator_1.studentSchema.safeParse(data);
    if (!validateStudentData.success) {
        const errors = validateStudentData.error.issues.map(({ message, path }) => `${path}: ${message}`);
        throw new http_error_1.default(http_status_1.HttpStatus.BAD_REQUEST, errors.join(". "));
    }
    else {
        const studentIndex = yield (0, referralCodeGenerator_1.generateStudentIndex)();
        const findStudent = yield prisma_1.default.student.findUnique({
            where: {
                studentId: studentIndex
            }
        });
        if (!findStudent) {
            const findClass = yield prisma_1.default.classes.findUnique({
                where: { id: data.classId },
            });
            if (!findClass) {
                throw new http_error_1.default(http_status_1.HttpStatus.NOT_FOUND, `Class with id ${data.classId} not found`);
            }
            else {
                const generatedPassword = yield (0, referralCodeGenerator_1.generateReferallCode)();
                const newStudent = yield prisma_1.default.student.create({
                    data: {
                        firstName: data.firstName,
                        lastName: data.lastName,
                        otherName: data.otherName,
                        gender: data.gender,
                        photoUrl: picture.photoUrl,
                        photoKey: picture.photoKey,
                        studentId: studentIndex,
                        password: generatedPassword,
                        classId: data.classId,
                        del_flag: false
                    }
                });
                const { password } = newStudent, studentWithoutPassword = __rest(newStudent, ["password"]);
                return studentWithoutPassword;
            }
        }
        else {
            throw new http_error_1.default(http_status_1.HttpStatus.CONFLICT, "Student with this Index already exists");
        }
    }
});
exports.registerStudent = registerStudent;
const fetchStudents = () => __awaiter(void 0, void 0, void 0, function* () {
    const retrievedStudent = yield prisma_1.default.student.findMany({
        orderBy: {
            studentId: 'desc'
        }
    });
    return retrievedStudent;
});
exports.fetchStudents = fetchStudents;
const fetchStudentById = (studentId) => __awaiter(void 0, void 0, void 0, function* () {
    const findStudent = yield prisma_1.default.student.findUnique({
        where: {
            studentId
        }
    });
    return findStudent;
});
exports.fetchStudentById = fetchStudentById;
const fetchStudentByClass = (className) => __awaiter(void 0, void 0, void 0, function* () {
    const findClass = yield prisma_1.default.classes.findFirst({
        where: {
            className
        }
    });
    if (!findClass) {
        throw new http_error_1.default(http_status_1.HttpStatus.NOT_FOUND, `Class  name ${className} not found`);
    }
    else {
        const retrievedStudent = yield prisma_1.default.student.findMany({
            where: {
                classId: findClass.id
            },
            orderBy: {
                studentId: 'desc'
            }
        });
        return retrievedStudent;
    }
});
exports.fetchStudentByClass = fetchStudentByClass;
const updateStudentDetails = (studentId, data) => __awaiter(void 0, void 0, void 0, function* () {
    const findStudent = yield prisma_1.default.student.findUnique({
        where: {
            studentId
        }
    });
    if (!findStudent) {
        throw new http_error_1.default(http_status_1.HttpStatus.NOT_FOUND, `Student with id ${studentId} not found`);
    }
    else {
        const updatedStudentDetails = yield prisma_1.default.student.update({
            where: {
                studentId
            },
            data: Object.assign({}, data)
        });
        return updatedStudentDetails;
    }
});
exports.updateStudentDetails = updateStudentDetails;
const deleteStudents = (studentId) => __awaiter(void 0, void 0, void 0, function* () {
    const findStudent = yield prisma_1.default.student.findUnique({
        where: {
            studentId
        }
    });
    if (!findStudent) {
        throw new http_error_1.default(http_status_1.HttpStatus.NOT_FOUND, `Student with id ${studentId} not found`);
    }
    else {
        const deletedStudent = yield prisma_1.default.student.delete({
            where: {
                studentId
            }
        });
        return deletedStudent;
    }
});
exports.deleteStudents = deleteStudents;
const automaticRemovalOfStudent = () => __awaiter(void 0, void 0, void 0, function* () {
    const currentDate = new Date();
    const sixMonthsAgo = new Date(currentDate.setMonth(currentDate.getMonth() - 6));
    // Find the student who has been absent for the last 6 months
    const findStudent = yield prisma_1.default.student.findFirst({
        where: {
            del_flag: true,
            attendance: {
                none: {
                    attendanceStatus: 'present',
                    date: { gte: sixMonthsAgo },
                }
            },
        },
        orderBy: {
            createdAt: 'asc', // Pick the student who was created first
        },
    });
    if (findStudent) {
        const deletedStudent = yield prisma_1.default.student.delete({
            where: {
                id: findStudent.studentId,
            }
        });
        return deletedStudent;
    }
    else {
        throw new http_error_1.default(http_status_1.HttpStatus.NOT_FOUND, "No student marked for automatic removal based on attendance");
    }
});
exports.automaticRemovalOfStudent = automaticRemovalOfStudent;
const login = (studentId, password) => __awaiter(void 0, void 0, void 0, function* () {
    const findStudent = yield prisma_1.default.student.findUnique({
        where: {
            studentId
        }
    });
    if (!findStudent) {
        throw new http_error_1.default(http_status_1.HttpStatus.NOT_FOUND, "Student not found");
    }
    else {
        const checkPassword = yield (0, bcrypt_1.compare)(password, findStudent.password);
        if (checkPassword) {
            const tokenPayload = {
                id: findStudent.studentId,
                role: 'student'
            };
            const token = (0, jsonwebtoken_1.signToken)(tokenPayload);
            return { findStudent, token };
        }
        else {
            throw new http_error_1.default(http_status_1.HttpStatus.UNAUTHORIZED, "Invalid password");
        }
    }
});
exports.login = login;
const forgotPassword = (studentId) => __awaiter(void 0, void 0, void 0, function* () {
    const findStudent = yield prisma_1.default.student.findUnique({
        where: {
            studentId
        }
    });
    if (!findStudent) {
        throw new http_error_1.default(http_status_1.HttpStatus.NOT_FOUND, "Student not found");
    }
    else {
        const newPassword = yield (0, referralCodeGenerator_1.generateReferallCode)();
        const updatedStudentPassword = yield prisma_1.default.student.update({
            where: {
                studentId
            },
            data: {
                password: newPassword
            }
        });
        return updatedStudentPassword;
    }
});
exports.forgotPassword = forgotPassword;
const changePassword = (studentId, oldPassword, password) => __awaiter(void 0, void 0, void 0, function* () {
    const findStudent = yield prisma_1.default.student.findUnique({
        where: {
            studentId
        }
    });
    if (!findStudent) {
        throw new http_error_1.default(http_status_1.HttpStatus.NOT_FOUND, "Student not found");
    }
    else {
        const checkOldPassword = yield (0, bcrypt_1.compare)(oldPassword, findStudent.password);
        if (checkOldPassword) {
            const newPassword = yield (0, bcrypt_1.hash)(password);
            const updatedStudentPassword = yield prisma_1.default.student.update({
                where: {
                    studentId
                },
                data: {
                    password: newPassword
                }
            });
            return updatedStudentPassword;
        }
        else {
            throw new http_error_1.default(http_status_1.HttpStatus.UNAUTHORIZED, "Invalid old password");
        }
    }
});
exports.changePassword = changePassword;
