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
exports.verifyOtp = exports.resetPassword = exports.forgotPasswordLink = exports.deleteTutor = exports.updateTutor = exports.fetchTutorByEmail = exports.fetchTutorById = exports.fetchTutors = exports.signIn = exports.addTutor = void 0;
const http_error_1 = __importDefault(require("../utils/http-error"));
const http_status_1 = require("../utils/http-status");
const prisma_1 = __importDefault(require("../utils/prisma"));
const bcrypt_1 = require("../utils/bcrypt");
const jsonwebtoken_1 = require("../utils/jsonwebtoken");
const emailTransporter_1 = require("../utils/emailTransporter");
const tutorValidator_1 = require("../validators/tutorValidator");
const referralCodeGenerator_1 = require("../utils/referralCodeGenerator");
const addTutor = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const validateTutorData = tutorValidator_1.tutorSchema.safeParse(data);
    if (!validateTutorData.success) {
        const errors = validateTutorData.error.issues.map(({ message, path }) => `${path}: ${message}`);
        throw new http_error_1.default(http_status_1.HttpStatus.BAD_REQUEST, errors.join(". "));
    }
    else {
        const checkTutorAvailability = yield prisma_1.default.tutor.findUnique({
            where: {
                email: data.email
            }
        });
        if (!checkTutorAvailability) {
            //check registrationCode
            const findAdminRegistrationCode = yield prisma_1.default.admin.findUnique({
                where: {
                    generatedRegistrationCodes: data.registeredCode
                }
            });
            if (!findAdminRegistrationCode) {
                throw new http_error_1.default(http_status_1.HttpStatus.FORBIDDEN, "Invalid registration code");
            }
            else {
                if (findAdminRegistrationCode.maxUsedCode <= findAdminRegistrationCode.totalCodeUsed) {
                    throw new http_error_1.default(http_status_1.HttpStatus.FORBIDDEN, "Maximum number of codes used");
                }
                else {
                    yield prisma_1.default.admin.update({
                        where: {
                            id: findAdminRegistrationCode.id,
                        },
                        data: {
                            maxUsedCode: {
                                decrement: 1,
                            },
                            totalCodeUsed: {
                                increment: 1,
                            }
                        }
                    });
                    const generatedPassword = yield (0, referralCodeGenerator_1.generateReferallCode)();
                    const savedTutor = yield prisma_1.default.tutor.create({
                        data: {
                            firstName: data.firstName,
                            lastName: data.lastName,
                            gender: data.gender,
                            email: data.email,
                            password: generatedPassword,
                            contact: data.contact,
                            registeredCode: data.registeredCode
                        }
                    });
                    const { password } = savedTutor, tutorWithoutPassword = __rest(savedTutor, ["password"]);
                    return tutorWithoutPassword;
                }
            }
        }
        else {
            throw new http_error_1.default(http_status_1.HttpStatus.CONFLICT, "Email already exists");
        }
    }
    ;
});
exports.addTutor = addTutor;
const signIn = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const fetchedTutor = yield prisma_1.default.tutor.findUnique({
        where: {
            email
        }
    });
    if (!fetchedTutor) {
        throw new http_error_1.default(http_status_1.HttpStatus.NOT_FOUND, "Tutor does not exist");
    }
    else {
        const verifiedPassword = yield (0, bcrypt_1.compare)(password, fetchedTutor.password);
        if (!verifiedPassword) {
            throw new http_error_1.default(http_status_1.HttpStatus.UNAUTHORIZED, "Invalid email or password");
        }
        else {
            return fetchedTutor;
        }
    }
});
exports.signIn = signIn;
const fetchTutors = () => __awaiter(void 0, void 0, void 0, function* () {
    const getAllTutors = yield prisma_1.default.tutor.findMany();
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
        throw new http_error_1.default(http_status_1.HttpStatus.NOT_FOUND, "Tutor not found");
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
        throw new http_error_1.default(http_status_1.HttpStatus.NOT_FOUND, "Tutor not found");
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
const forgotPasswordLink = (email, link, passwordResetLink) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield (0, exports.fetchTutorByEmail)(email))) {
        throw new http_error_1.default(http_status_1.HttpStatus.NOT_FOUND, "Tutor not found");
    }
    else {
        // Sign the token with JWT
        const token = (0, jsonwebtoken_1.signToken)({ id: email, role: 'tutor' });
        // Generate a hashed resetLink
        const hashedResetLink = yield (0, bcrypt_1.hash)(passwordResetLink || "null");
        // Set an expiration time (e.g., 5 minutes from now)
        const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes in milliseconds
        // Update the reset token, hashed reset link, and expiration in the tutor table
        yield prisma_1.default.tutor.update({
            where: { email },
            data: {
                passwordResetToken: token,
                hashedResetLink: hashedResetLink,
                passwordResetExpiration: expiresAt,
                hashedResetLinkExpired: false,
            }
        });
        // Send email with password reset link
        yield (0, emailTransporter_1.sendPasswordResetLink)(email, link, hashedResetLink);
        return { token };
    }
});
exports.forgotPasswordLink = forgotPasswordLink;
const resetPassword = (newPassword, token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!newPassword || !token) {
            throw new http_error_1.default(http_status_1.HttpStatus.BAD_REQUEST, "Missing required fields ");
        }
        else {
            const findToken = yield prisma_1.default.tutor.findFirst({
                where: {
                    passwordResetToken: token,
                    passwordResetExpiration: new Date()
                }
            });
            if (!findToken) {
                throw new http_error_1.default(http_status_1.HttpStatus.UNAUTHORIZED, "Invalid token");
            }
            else {
                const hashedPassword = yield (0, bcrypt_1.hash)(newPassword);
                if (!hashedPassword) {
                    throw new http_error_1.default(http_status_1.HttpStatus.INTERNAL_SERVER_ERROR, "Error hashing password");
                }
                else {
                    // Update the password and mark reset as completed
                    yield prisma_1.default.tutor.update({
                        where: { id: findToken.id },
                        data: {
                            password: hashedPassword,
                            passwordResetToken: null,
                            hashedResetLink: null,
                            passwordResetCompleted: true,
                            hashedResetLinkExpired: true
                        },
                    });
                    return "Password reset successful";
                }
            }
        }
    }
    catch (error) {
        throw new http_error_1.default(http_status_1.HttpStatus.INTERNAL_SERVER_ERROR, "Error resetting password");
    }
});
exports.resetPassword = resetPassword;
const verifyOtp = (email, otp) => __awaiter(void 0, void 0, void 0, function* () {
    const tutor = yield prisma_1.default.tutor.findUnique({ where: { email } });
    if (!tutor) {
        throw new http_error_1.default(http_status_1.HttpStatus.UNAUTHORIZED, "Invalid OTP or Tutor not found");
    }
    // Check if the OTP matches
    if (tutor.otp !== otp) {
        throw new http_error_1.default(http_status_1.HttpStatus.UNAUTHORIZED, "Invalid OTP");
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
