import {z} from "zod"


export const adminSchema = z.object({
    fullname: z.string({required_error: "Fullname is required"})
    .trim()
    .min(1, "please name cannot be empty "),
    email: z.string({required_error:"Email is required"}).email({message: "Invalid email address"}),
    password: z.string({required_error: "Password is required"}).min(6, "too small"),
    otp: z.string({required_error: "please entere otp"}).optional(),
   phone: z.string({required_error: "Phone number is required"}),
   schoolCode: z.string({required_error: "School code is required"})
})


export type adminData = z.infer<typeof adminSchema>
