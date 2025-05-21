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
exports.verifyOtp = exports.deleteTutor = exports.updateTutor = exports.fetchTutorByEmail = exports.fetchTutorById = exports.fetchTutors = exports.signIn = exports.addTutor = void 0;
const http_status_1 = require("../utils/http-status");
const prisma_1 = __importDefault(require("../utils/prisma"));
const bcrypt_1 = require("../utils/bcrypt");
const jsonwebtoken_1 = require("../utils/jsonwebtoken");
const tutorValidator_1 = require("../validators/tutorValidator");
const errorHandler_1 = require("../middleware/errorHandler");
const addTutor = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const validateTutorData = tutorValidator_1.tutorSchema.safeParse(data);
    if (!validateTutorData.success) {
        const errors = validateTutorData.error.issues.map(({ message, path }) => `${path}: ${message}`);
        (0, errorHandler_1.throwError)(http_status_1.HttpStatus.BAD_REQUEST, errors.join(". "));
    }
    // Check if the tutor already exists
    const checkTutorAvailability = yield prisma_1.default.tutor.findUnique({
        where: {
            email: data.email,
        },
    });
    if (!checkTutorAvailability) {
        // Validate the provided registration code
        const findAdminRegistrationCode = yield prisma_1.default.admin.findUnique({
            where: {
                tutorRegistrationCode: data.registrationCode,
            },
        });
        if (!findAdminRegistrationCode) {
            (0, errorHandler_1.throwError)(http_status_1.HttpStatus.FORBIDDEN, "Invalid registration code");
        }
        else {
        }
    }
});
exports.addTutor = addTutor;
const signIn = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const fetchedTutor = yield prisma_1.default.tutor.findUnique({
        where: {
            email
        }
    });
    if (!fetchedTutor) {
        (0, errorHandler_1.throwError)(http_status_1.HttpStatus.NOT_FOUND, "Tutor does not exist");
    }
    else {
        const verifiedPassword = yield (0, bcrypt_1.compare)(password, fetchedTutor.password);
        if (!verifiedPassword) {
            (0, errorHandler_1.throwError)(http_status_1.HttpStatus.UNAUTHORIZED, "Invalid email or password");
        }
        else {
            return "check your email for otp";
        }
    }
});
exports.signIn = signIn;
const fetchTutors = () => __awaiter(void 0, void 0, void 0, function* () {
    const getAllTutors = yield prisma_1.default.tutor.findMany({
        orderBy: {
            createdAt: "desc"
        },
        include: {
            subjects: true
        }
    });
    return getAllTutors;
});
exports.fetchTutors = fetchTutors;
const fetchTutorById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const fetchedTutor = yield prisma_1.default.tutor.findUnique({
        where: {
            id
        }
    });
    return fetchedTutor;
});
exports.fetchTutorById = fetchTutorById;
const fetchTutorByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const fetchedTutor = yield prisma_1.default.tutor.findUnique({
        where: {
            email
        }
    });
    return fetchedTutor;
});
exports.fetchTutorByEmail = fetchTutorByEmail;
const updateTutor = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const findTutor = yield prisma_1.default.tutor.findUnique({
        where: {
            id
        }
    });
    if (!findTutor) {
        (0, errorHandler_1.throwError)(http_status_1.HttpStatus.NOT_FOUND, "Tutor not found");
    }
    else {
        const updatedTutor = yield prisma_1.default.tutor.update({
            where: {
                id
            },
            data
        });
        return updatedTutor;
    }
});
exports.updateTutor = updateTutor;
const deleteTutor = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const findTutor = yield prisma_1.default.tutor.findUnique({
        where: {
            id
        }
    });
    if (!findTutor) {
        (0, errorHandler_1.throwError)(http_status_1.HttpStatus.NOT_FOUND, "Tutor not found");
    }
    else {
        yield prisma_1.default.tutor.delete({
            where: {
                id
            }
        });
        return { message: "Tutor deleted successfully" };
    }
});
exports.deleteTutor = deleteTutor;
const verifyOtp = (email, otp) => __awaiter(void 0, void 0, void 0, function* () {
    const tutor = yield prisma_1.default.tutor.findUnique({ where: { email } });
    if (!tutor) {
        (0, errorHandler_1.throwError)(http_status_1.HttpStatus.UNAUTHORIZED, "Invalid OTP or Tutor not found");
    }
    // Check if the OTP matches
    if (tutor.otp !== otp) {
        (0, errorHandler_1.throwError)(http_status_1.HttpStatus.UNAUTHORIZED, "Invalid OTP");
    }
    // Generate a JWT token if OTP is correct
    const token = (0, jsonwebtoken_1.signToken)({ id: tutor.id, role: 'tutor' });
    // Clear the OTP from the database after successful verification
    yield prisma_1.default.tutor.update({
        where: {
            id: tutor.id
        },
        data: { otp: null },
    });
    return token;
});
exports.verifyOtp = verifyOtp;
