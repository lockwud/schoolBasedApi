"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentSchema = void 0;
const zod_1 = require("zod");
const tutorValidator_1 = require("./tutorValidator");
exports.studentSchema = zod_1.z.object({
    firstName: zod_1.z.string({ required_error: "First name cannot be empty" })
        .trim()
        .min(1, "First name is required"),
    lastName: zod_1.z.string({ required_error: "Last name cannot be empty" })
        .trim()
        .min(1, "Last name is required"),
    otherName: zod_1.z.string().optional(),
    gender: tutorValidator_1.gender,
    classId: zod_1.z.string({ required_error: "Class id is required" })
        .trim()
        .min(1, "Class Id cannot be empty"),
    contact: zod_1.z.string().optional(),
});
