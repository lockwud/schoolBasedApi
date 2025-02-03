"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.attendanceSchema = exports.attendanceStatus = void 0;
const zod_1 = require("zod");
exports.attendanceStatus = zod_1.z.enum([
    "present",
    "absent",
    "partial"
]);
exports.attendanceSchema = zod_1.z.object({
    studentId: zod_1.z
        .string({ required_error: "Please provide student Id" })
        .trim()
        .min(10, "Invalid Index"),
    date: zod_1.z.preprocess((arg) => {
        if (typeof arg === "string") {
            const parsedDate = new Date(arg);
            console.log("Preprocessed Date:", arg);
            return isNaN(parsedDate.getTime()) ? null : parsedDate;
        }
        return arg;
    }, zod_1.z.date({
        required_error: "Please provide a valid date",
    }).min(new Date(2022, 0, 1), "Date cannot be before January 1, 2022")
        .max(new Date(), "Date cannot be in the future")),
    attendanceStatus: exports.attendanceStatus,
    reason: zod_1.z.string().optional(),
    classId: zod_1.z.string({ required_error: "Please provide the class Id" }),
    tutorId: zod_1.z.string({ required_error: "Please provide the tutor Id" }),
});
