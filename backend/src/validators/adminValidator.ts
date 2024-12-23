import {z} from "zod"




export const adminSchema = z.object({
    name: z.string({required_error: "Name is required"})
    .trim()
    .min(1, "please name cannot be empty "),
    email: z.string({required_error:"Email is required"}).email({message: "Invalid email address"}),
    gender: z.enum(["male","female"]),
    contact: z.string({required_error: "Contact is required"})
    .trim()
    .min(10, "Invalid contact").max(10, "Invalid contact"),
    password: z.string({required_error: "Password is required"}).min(6, "too small"),
    otp: z.string({required_error: "please entere otp"}).optional()
})

export type adminData = z.infer<typeof adminSchema>
