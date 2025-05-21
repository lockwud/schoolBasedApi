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
exports.fetchSuperAdminByEmail = exports.verifySuperAdminOtp = exports.loginSuperAdmin = exports.createSuperAdmin = void 0;
const http_status_1 = require("../utils/http-status");
const prisma_1 = __importDefault(require("../utils/prisma"));
const bcrypt_1 = require("../utils/bcrypt");
const jsonwebtoken_1 = require("../utils/jsonwebtoken");
const emailTransporter_1 = require("../utils/emailTransporter");
const errorHandler_1 = require("../middleware/errorHandler");
const superAdmin_validator_1 = require("../validators/superAdmin.validator");
const createSuperAdmin = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const validateSuperAdminData = superAdmin_validator_1.superAdminSchema.safeParse(data);
    if (!validateSuperAdminData.success) {
        const errors = validateSuperAdminData.error.issues.map(({ message, path }) => `${path}: ${message}`);
        (0, errorHandler_1.throwError)(http_status_1.HttpStatus.BAD_REQUEST, errors.join(". "));
    }
    else {
        const checkSuperAdminAvailability = yield prisma_1.default.superAdmin.findUnique({
            where: {
                email: data.email,
            },
        });
        if (!checkSuperAdminAvailability) {
            const hashedPassword = yield (0, bcrypt_1.hash)(data.password);
            // Save superAdmin to the database
            const saveSuperAdmin = yield prisma_1.default.superAdmin.create({
                data: Object.assign(Object.assign({}, data), { password: hashedPassword }),
            });
            const signedToken = (0, jsonwebtoken_1.signToken)({ id: saveSuperAdmin.id, role: "superAdmin" });
            const superAdmin = yield prisma_1.default.superAdmin.update({
                where: {
                    id: saveSuperAdmin.id,
                },
                data: {
                    token: signedToken,
                },
            });
            const { password } = superAdmin, superAdminDataWithoutPassword = __rest(superAdmin, ["password"]);
            return { superAdminDataWithoutPassword };
        }
        else {
            (0, errorHandler_1.throwError)(http_status_1.HttpStatus.CONFLICT, "Super admin already exists");
        }
    }
});
exports.createSuperAdmin = createSuperAdmin;
const loginSuperAdmin = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const findSuperAdmin = yield prisma_1.default.superAdmin.findUnique({ where: { email } });
    if (!findSuperAdmin) {
        (0, errorHandler_1.throwError)(http_status_1.HttpStatus.NOT_FOUND, "Super admin not found");
    }
    else {
        const isValidPassword = yield (0, bcrypt_1.compare)(password, findSuperAdmin.password);
        if (!isValidPassword) {
            (0, errorHandler_1.throwError)(http_status_1.HttpStatus.UNAUTHORIZED, "Invalid password");
        }
        const otp = yield (0, emailTransporter_1.generateOtp)();
        yield (0, emailTransporter_1.sendOtpEmail)(email, otp);
        yield prisma_1.default.superAdmin.update({
            where: { email },
            data: { otp },
        });
        setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
            yield prisma_1.default.superAdmin.update({
                where: { email },
                data: { otp: null },
            });
        }), 5 * 60 * 1000);
        return { message: "Check your email for otp" };
    }
});
exports.loginSuperAdmin = loginSuperAdmin;
const verifySuperAdminOtp = (email, otp) => __awaiter(void 0, void 0, void 0, function* () {
    const findSuperAdmin = yield prisma_1.default.superAdmin.findUnique({ where: { email } });
    if (!findSuperAdmin) {
        (0, errorHandler_1.throwError)(http_status_1.HttpStatus.NOT_FOUND, "Super admin not found");
    }
    else {
        if (findSuperAdmin.otp === otp) {
            const token = (0, jsonwebtoken_1.signToken)({ id: findSuperAdmin.id, role: "superAdmin" });
            return { superAdmin: findSuperAdmin, token };
        }
        else {
            (0, errorHandler_1.throwError)(http_status_1.HttpStatus.UNAUTHORIZED, "Invalid OTP");
        }
    }
});
exports.verifySuperAdminOtp = verifySuperAdminOtp;
const fetchSuperAdminByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const findSuperAdmin = yield prisma_1.default.superAdmin.findUnique({ where: { email } });
    if (!findSuperAdmin) {
        (0, errorHandler_1.throwError)(http_status_1.HttpStatus.NOT_FOUND, "Super admin not found");
    }
    else {
        const token = (0, jsonwebtoken_1.signToken)({ id: findSuperAdmin.id, role: "superAdmin" });
        return { findSuperAdmin, token };
    }
});
exports.fetchSuperAdminByEmail = fetchSuperAdminByEmail;
