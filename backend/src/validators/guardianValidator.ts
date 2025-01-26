import {z} from "zod"

export const gender = z.enum([
    "male",
    "female"
]);

export const guardianType = z.enum([
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
])


export const guardianSchema = z.object({
    fullName: z.string({required_error:"Full name is required"})
    .trim()
    .min(5, "please provide your fullname"),
    gender: gender,
    studentId: z.string({required_error:"Please provide your wards Id"})
    .trim()
    .min(10, "please provide a valid student id"),
    relationship: guardianType,
    contact: z.string({required_error:"Please provide your contact number"})
    .trim()
    .min(10, "please provide a valid contact number")
    .max(10, "contact number cannot exceed 10 digits"),
    email: z.string().email({message:"Please provide a valid mail"}),
    occupation: z.string().optional(),
    address: z.string().optional()
})

export type guardianData = z.infer<typeof guardianSchema>