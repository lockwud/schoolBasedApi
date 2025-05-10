import { school } from './../../node_modules/.pnpm/@prisma+client@5.22.0_prisma@5.22.0/node_modules/.prisma/client/index.d';
import {z} from "zod"


export const adminSchema = z.object({
    fullname: z.string({required_error: "Name is required"})
    .trim()
    .min(1, "please name cannot be empty "),
    email: z.string({required_error:"Email is required"}).email({message: "Invalid email address"}),
    password: z.string({required_error: "Password is required"}).min(6, "too small"),
    otp: z.string({required_error: "please entere otp"}).optional(),
    passwordResetToken: z.string({required_error: "Password reset token is required"}).optional(),
    hashedResetLink: z.string({required_error: "Password reset token expiry is required"}).optional(),
    maxUsedCode: z.number({required_error: "Max used code is required"}).optional(),
    schoolId: z.string({required_error: "School id is required"}).optional(),
})


export type adminData = z.infer<typeof adminSchema>
