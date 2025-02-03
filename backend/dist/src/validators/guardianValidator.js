"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.guardianSchema = exports.guardianType = exports.gender = void 0;
const zod_1 = require("zod");
exports.gender = zod_1.z.enum([
    "male",
    "female"
]);
exports.guardianType = zod_1.z.enum([
    "father",
    "mother",
    "guardian",
    "parent",
    "sibling",
    "grandparent",
    "aunt",
    "uncle",
    "cousin",
    "other"
]);
exports.guardianSchema = zod_1.z.object({
    fullName: zod_1.z.string({ required_error: "Full name is required" })
        .trim()
        .min(5, "please provide your fullname"),
    gender: exports.gender,
    studentId: zod_1.z.string({ required_error: "Please provide your wards Id" })
        .trim()
        .min(10, "please provide a valid student id"),
    relationship: exports.guardianType,
    contact: zod_1.z.string({ required_error: "Please provide your contact number" })
        .trim()
        .min(10, "please provide a valid contact number")
        .max(10, "contact number cannot exceed 10 digits"),
    email: zod_1.z.string().email({ message: "Please provide a valid mail" }),
    occupation: zod_1.z.string().optional(),
    address: zod_1.z.string().optional()
});
