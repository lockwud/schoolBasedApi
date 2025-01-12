"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentSchema = exports.gender = void 0;
const zod_1 = require("zod");
exports.gender = zod_1.z.enum([
    "male",
    "female"
]);
exports.studentSchema = zod_1.z.object({
    firstName: zod_1.z.string({ required_error: "First name cannot be empty" })
        .trim()
        .min(1, "First name is required"),
    lastName: zod_1.z.string({ required_error: "Last name cannot be empty" })
        .trim()
        .min(1, "Last name is required"),
    otherName: zod_1.z.string().optional(),
    gender: exports.gender,
    classId: zod_1.z.string({ required_error: "Class id is required" })
        .trim()
        .min(1, "Class Id cannot be empty"),
    contact: zod_1.z.string().optional(),
});
