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
exports.resetPassword = exports.forgotPasswordLink = exports.deleteAdminRecords = exports.fetchAdminById = exports.fetchAllAdmins = exports.fetchAdminByEmail = exports.updateAdmin = exports.verifyOtp = exports.signInAdmin = exports.registerAdmin = void 0;
const http_error_1 = __importDefault(require("../utils/http-error"));
const http_status_1 = require("../utils/http-status");
const prisma_1 = __importDefault(require("../utils/prisma"));
const bcrypt_1 = require("../utils/bcrypt");
const adminValidator_1 = require("../validators/adminValidator");
const jsonwebtoken_1 = require("../utils/jsonwebtoken");
const emailTransporter_1 = require("../utils/emailTransporter");
const registerAdmin = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const validateAdminData = adminValidator_1.adminSchema.safeParse(data);
    if (!validateAdminData.success) {
        const errors = validateAdminData.error.issues.map(({ message, path }) => `${path}: ${message}`);
        throw new http_error_1.default(http_status_1.HttpStatus.BAD_REQUEST, errors.join(". "));
    }
    else {
        const checkAdminAvailability = yield prisma_1.default.admin.findUnique({
            where: {
                email: data.email
            }
        });
        if (!checkAdminAvailability) {
            const HashedAdminPassword = yield (0, bcrypt_1.hash)(data.password);
            const saveAdmin = yield prisma_1.default.admin.create({
                data: Object.assign(Object.assign({}, data), { password: HashedAdminPassword })
            });
            const { password } = saveAdmin, adminDataWithoutPassword = __rest(saveAdmin, ["password"]);
            return adminDataWithoutPassword;
        }
        else {
            throw new http_error_1.default(http_status_1.HttpStatus.CONFLICT, "Admin already exist");
        }
    }
});
exports.registerAdmin = registerAdmin;
const signInAdmin = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const findAdmin = yield prisma_1.default.admin.findUnique({ where: { email } });
    if (!findAdmin) {
        throw new http_error_1.default(http_status_1.HttpStatus.NOT_FOUND, "Admin does not exist");
    }
    else {
        const verifiedPassword = yield (0, bcrypt_1.compare)(password, findAdmin.password);
        if (!verifiedPassword) {
            throw new http_error_1.default(http_status_1.HttpStatus.UNAUTHORIZED, "Invalid email or password");
        }
        else {
            return findAdmin;
        }
    }
});
exports.signInAdmin = signInAdmin;
const verifyOtp = (id, otp) => __awaiter(void 0, void 0, void 0, function* () {
    const admin = yield prisma_1.default.admin.findUnique({ where: { id } });
    if (!admin) {
        throw new http_error_1.default(http_status_1.HttpStatus.UNAUTHORIZED, "Invalid OTP or Student not found");
    }
    // Check if the OTP matches
    if (admin.otp !== otp) {
        throw new http_error_1.default(http_status_1.HttpStatus.UNAUTHORIZED, "Invalid OTP");
    }
    // Generate a JWT token if OTP is correct
    const token = (0, jsonwebtoken_1.signToken)({ id: admin.id, role: 'admin' });
    // Clear the OTP from the database after successful verification
    yield prisma_1.default.admin.update({
        where: {
            id: admin.id
        },
        data: { otp: null },
    });
    return token;
});
exports.verifyOtp = verifyOtp;
const updateAdmin = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const findAdmin = yield prisma_1.default.admin.findUnique({
        where: {
            id
        }
    });
    if (!findAdmin) {
        throw new http_error_1.default(http_status_1.HttpStatus.NOT_FOUND, "admin not found");
    }
    else {
        if (updateData.password) {
            const hashpassword = yield (0, bcrypt_1.hash)(updateData.password);
            if (!hashpassword) {
                throw new http_error_1.default(http_status_1.HttpStatus.INTERNAL_SERVER_ERROR, "Error hashing password");
            }
            updateData.password = hashpassword;
        }
        const updatedAdmin = yield prisma_1.default.admin.update({
            where: { id },
            data: updateData,
        });
        const { password } = updatedAdmin, adminDataWithoutPassword = __rest(updatedAdmin, ["password"]);
        return adminDataWithoutPassword;
    }
});
exports.updateAdmin = updateAdmin;
const fetchAdminByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const findAdmin = yield prisma_1.default.admin.findUnique({
        where: {
            email
        }
    });
    return findAdmin;
});
exports.fetchAdminByEmail = fetchAdminByEmail;
const fetchAllAdmins = () => __awaiter(void 0, void 0, void 0, function* () {
    const fetchedAdmins = yield prisma_1.default.admin.findMany();
    return fetchedAdmins;
});
exports.fetchAllAdmins = fetchAllAdmins;
const fetchAdminById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const findAdmin = yield prisma_1.default.admin.findUnique({
        where: {
            id
        }
    });
    return findAdmin;
});
exports.fetchAdminById = fetchAdminById;
const deleteAdminRecords = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedAdmin = yield prisma_1.default.admin.delete({
        where: {
            id
        }
    });
    return deletedAdmin;
});
exports.deleteAdminRecords = deleteAdminRecords;
const forgotPasswordLink = (email, link, passwordResetLink) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield (0, exports.fetchAdminByEmail)(email))) {
        throw new http_error_1.default(http_status_1.HttpStatus.NOT_FOUND, "Admin does not exist");
    }
    else {
        //sign the token with jwt
        const token = (0, jsonwebtoken_1.signToken)({ id: email, role: 'admin' });
        // Generate a hashed resetLink
        const hashedResetLink = yield (0, bcrypt_1.hash)(passwordResetLink || "null");
        // Update the reset token and hashed reset link in the admin table
        yield prisma_1.default.admin.update({
            where: {
                email: email
            },
            data: {
                passwordResetToken: token, // this token will be used to verify the reset link in the frontend
                passwordResetTokenExpiry: new Date(Date.now() + 3 * 600000), // 3 minutes
                hashedResetLink: hashedResetLink
            },
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
            const findToken = yield prisma_1.default.admin.findFirst({
                where: {
                    passwordResetToken: token
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
                    yield prisma_1.default.admin.update({
                        where: {
                            passwordResetToken: token
                        },
                        data: {
                            password: hashedPassword,
                            passwordResetToken: null,
                            hashedResetLink: null
                        },
                    });
                    return "Password reset successful";
                }
            }
        }
    }
    catch (error) {
        throw new http_error_1.default(http_status_1.HttpStatus.INTERNAL_SERVER_ERROR, "Error reseting password");
    }
});
exports.resetPassword = resetPassword;
