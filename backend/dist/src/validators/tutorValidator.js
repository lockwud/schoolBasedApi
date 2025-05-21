"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tutorSchema = exports.gender = void 0;
const zod_1 = require("zod");
exports.gender = zod_1.z.enum([
    "male",
    "female"
]);
exports.tutorSchema = zod_1.z.object({
    firstname: zod_1.z.string({ required_error: "First name cannot be empty" })
        .trim()
        .min(1, "first name is required"),
    surname: zod_1.z.string({ required_error: "Last name cannot be empty" })
        .trim()
        .min(1, "Last name is required"),
    gender: exports.gender,
    email: zod_1.z.string().email({ message: "Please provide a valid mail" }),
    password: zod_1.z.string({ required_error: "Password is required" }),
    contact: zod_1.z.string({ required_error: "Mobile number is required" })
        .trim()
        .min(10, "Phone number cannot be less than 10 digits").max(10, "Phone number cannot exceed 10 digits"),
    otp: zod_1.z.string({ required_error: "please entere otp" }).optional(),
    registrationCode: zod_1.z.string({ required_error: "Registration code is required" }),
});
