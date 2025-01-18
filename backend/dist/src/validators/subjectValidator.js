"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subjectSchema = void 0;
const zod_1 = require("zod");
exports.subjectSchema = zod_1.z.object({
    subjectName: zod_1.z.string({ required_error: "Provide the subject name" })
        .trim()
        .min(3, "Name is too less")
});
