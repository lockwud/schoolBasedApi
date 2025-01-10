import {z} from "zod"

import { gender } from "./tutorValidator"

export const studentSchema = z.object({
    firstName: z.string({required_error: "First name cannot be empty"})
   .trim()
   .min(1, "First name is required"),
    lastName: z.string({required_error: "Last name cannot be empty"})
    .trim()
    .min(1, "Last name is required"),
    otherName: z.string().optional(),
    gender: gender,  
   classId: z.string({required_error:"Class id is required"})
   .trim()
   .min(1, "Class Id cannot be empty"),
    contact: z.string().optional(),
});

export type studentData = z.infer<typeof studentSchema>