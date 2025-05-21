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
exports.updateSubjectTutor = exports.fetchSubjectTutors = exports.fetchSubjectByName = exports.fetchSubjects = exports.assignSubjectToTutors = exports.addSubject = void 0;
const http_status_1 = require("../utils/http-status");
const subjectValidator_1 = require("../validators/subjectValidator");
const prisma_1 = __importDefault(require("../utils/prisma"));
const errorHandler_1 = require("../middleware/errorHandler");
const addSubject = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const validateSubjectData = subjectValidator_1.subjectSchema.safeParse(data);
    if (!validateSubjectData.success) {
        const errors = validateSubjectData.error.issues.map(({ message, path }) => `${path}: ${message}`);
        (0, errorHandler_1.throwError)(http_status_1.HttpStatus.BAD_REQUEST, errors.join(". "));
    }
    else {
        const checkSubjectAvailability = yield prisma_1.default.subject.findUnique({
            where: {
                subjectName: data.subjectName
            }
        });
        if (!checkSubjectAvailability) {
            const subject = yield prisma_1.default.subject.create({
                data: {
                    subjectName: data.subjectName
                }
            });
            return subject;
        }
        else {
            (0, errorHandler_1.throwError)(http_status_1.HttpStatus.CONFLICT, "Subject already created");
        }
    }
});
exports.addSubject = addSubject;
const assignSubjectToTutors = (tutorsName, subject) => __awaiter(void 0, void 0, void 0, function* () {
    const findTutor = yield prisma_1.default.tutor.findFirst({
        where: {
            surname: tutorsName,
        },
    });
    if (!findTutor) {
        (0, errorHandler_1.throwError)(http_status_1.HttpStatus.NOT_FOUND, "No tutor found");
    }
    const findSubject = yield prisma_1.default.subject.findUnique({
        where: {
            subjectName: subject,
        },
        include: {
            tutors: true,
        },
    });
    if (!findSubject) {
        (0, errorHandler_1.throwError)(http_status_1.HttpStatus.NOT_FOUND, "Subject not found");
    }
    // Check if the tutor is already assigned to the subject
    const isAlreadyAssigned = findSubject.tutors.some((tutor) => tutor.id === findTutor.id);
    if (isAlreadyAssigned) {
        (0, errorHandler_1.throwError)(http_status_1.HttpStatus.CONFLICT, "Tutor is already assigned to this subject");
    }
    // Assign the subject to the tutor
    const updatedTutor = yield prisma_1.default.tutor.update({
        where: {
            id: findTutor.id,
        },
        data: {
            subjects: {
                connect: { id: findSubject.id },
            },
        },
    });
    return updatedTutor;
});
exports.assignSubjectToTutors = assignSubjectToTutors;
const fetchSubjects = () => __awaiter(void 0, void 0, void 0, function* () {
    const allSubject = yield prisma_1.default.subject.findMany({
        orderBy: {
            createdAt: "desc"
        }
    });
    return allSubject;
});
exports.fetchSubjects = fetchSubjects;
const fetchSubjectByName = (subjectName) => __awaiter(void 0, void 0, void 0, function* () {
    const fetchedSubject = yield prisma_1.default.subject.findUnique({
        where: {
            subjectName
        },
        include: {
            tutors: true
        }
    });
    if (!fetchedSubject) {
        (0, errorHandler_1.throwError)(http_status_1.HttpStatus.NOT_FOUND, "subject not found");
    }
    return fetchedSubject;
});
exports.fetchSubjectByName = fetchSubjectByName;
const fetchSubjectTutors = (subjectName) => __awaiter(void 0, void 0, void 0, function* () {
    const subjectTutors = yield prisma_1.default.subject.findUnique({
        where: {
            subjectName
        },
        select: {
            tutors: true
        }
    });
    return subjectTutors;
});
exports.fetchSubjectTutors = fetchSubjectTutors;
const updateSubjectTutor = (subjectName, tutorName) => __awaiter(void 0, void 0, void 0, function* () {
    const findSubject = yield prisma_1.default.subject.findUnique({
        where: {
            subjectName: subjectName,
        },
    });
    const findTutor = yield prisma_1.default.tutor.findFirst({
        where: {
            surname: tutorName,
        },
    });
    if (!findSubject || !findTutor) {
        (0, errorHandler_1.throwError)(http_status_1.HttpStatus.NOT_FOUND, "Subject or tutor not found");
    }
    const updatedTutor = yield prisma_1.default.tutor.update({
        where: {
            id: findTutor.id,
        },
        data: {
            subjects: {
                connect: { id: findSubject.id },
            },
        },
    });
    return updatedTutor;
});
exports.updateSubjectTutor = updateSubjectTutor;
