import {z} from "zod"

export const gender = z.enum([
    "male",
    "female"
]);

export const guardianSchema = z.object({
    fullName: z.string({required_error:"Full name is required"})
    .trim()
    .min(5, "please provide your fullname"),
    gender: gender,
    studentId: z.string({required_error:"Please provide your wards Id"})
    .trim()
    .min(10, "please provide a valid id")
})