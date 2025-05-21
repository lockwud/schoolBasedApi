"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.superAdminSchema = void 0;
const zod_1 = require("zod");
exports.superAdminSchema = zod_1.z.object({
    fullname: zod_1.z.string({ required_error: "Full name is required" }).trim().min(3, "Full name should be at least 3 characters long"),
    email: zod_1.z.string().email({ message: "Invalid email address" }),
    password: zod_1.z.string({ required_error: "Password is required" }).min(8, "Password should be at least 8 characters long")
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Password should contain at least one uppercase letter, one lowercase letter, one number, and one special character")
        .trim()
        .min(1, "Invslid password format"),
    phone: zod_1.z.string({ required_error: "Phone number is required" }).trim().min(10, "Phone number should be at least 10 digits long").max(13, "Phone number should be at most 13 digits long"),
    status: zod_1.z.enum(["active", "inactive", "deleted"]),
    otp: zod_1.z.string({ required_error: "Please enter otp" }).optional(),
    roles: zod_1.z.array(zod_1.z.enum(["superAdmin", "admin", "tutor", "student", "guardian", "parent"])).optional(),
});
