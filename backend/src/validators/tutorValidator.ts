import {z} from "zod"

export const gender = z.enum([
    "male",
    "female"
]);

export const tutorSchema = z.object({
    firstName: z.string({required_error: "First name cannot be empty"})
    .trim()
    .min(1, "first name is required"),
    lastName: z.string({required_error: "Last name cannot be empty"})
    .trim()
    .min(1, "Last name is required"),
    gender: gender,
    email: z.string().email({message:"Please provide a valid mail"}),
    contact: z.string({required_error: "Mobile number is required"})
    .trim()
    .min(10, "Phone number cannot be less than 10 digits").max(10, "Phone number cannot exceed 10 digits"),
    otp: z.string({required_error: "please entere otp"}).optional(),
    registeredCode: z.string({required_error: "Registration code is required"}).trim(),
    hashedResetLink: z.string({required_error: "Password reset token expiry is required"}).optional(),

});

export type tutorData = z.infer<typeof tutorSchema>