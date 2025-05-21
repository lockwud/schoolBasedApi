"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminSchema = void 0;
const zod_1 = require("zod");
exports.adminSchema = zod_1.z.object({
    fullname: zod_1.z.string({ required_error: "Fullname is required" })
        .trim()
        .min(1, "please name cannot be empty "),
    email: zod_1.z.string({ required_error: "Email is required" }).email({ message: "Invalid email address" }),
    password: zod_1.z.string({ required_error: "Password is required" }).min(6, "too small"),
    otp: zod_1.z.string({ required_error: "please entere otp" }).optional(),
    phone: zod_1.z.string({ required_error: "Phone number is required" }),
    schoolCode: zod_1.z.string({ required_error: "School code is required" })
});
