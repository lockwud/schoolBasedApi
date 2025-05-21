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
    dob: zod_1.z.preprocess((arg) => {
        if (typeof arg === "string") {
            const parsedDate = new Date(arg);
            console.log("Preprocessed Date:", arg);
            return isNaN(parsedDate.getTime()) ? null : parsedDate;
        }
        return arg;
    }, zod_1.z.date({
        required_error: "Please provide a valid date",
    }).min(new Date(2000, 0, 1), "Date cannot be before January 1, 2000")
        .max(new Date(), "Date cannot be in the future")),
    studentId: zod_1.z.string({ required_error: "Student Id is required" })
        .trim()
        .min(10, "Student Id cannot be empty"),
    password: zod_1.z.string({ required_error: "Password is required" }),
    contact: zod_1.z.string().optional(),
    parentContact: zod_1.z.string({ required_error: "Parent contact is required" }),
    classId: zod_1.z.string().optional(),
    adminId: zod_1.z.string({ required_error: "Admin Id is required" }),
});
