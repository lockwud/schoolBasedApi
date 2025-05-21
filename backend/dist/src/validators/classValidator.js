"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.classSchema = void 0;
const zod_1 = require("zod");
exports.classSchema = zod_1.z.object({
    className: zod_1.z.string({ required_error: "please provide a class name" })
        .trim()
        .min(1, "class name cannot be empty"),
    capacity: zod_1.z.string().max(100, "class size cannot exceed 50 student"),
    schoolId: zod_1.z.string({ required_error: "Provide the school code" })
});
