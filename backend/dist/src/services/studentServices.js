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
exports.registerStudent = void 0;
const http_error_1 = __importDefault(require("../utils/http-error"));
const http_status_1 = require("../utils/http-status");
const prisma_1 = __importDefault(require("../utils/prisma"));
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
