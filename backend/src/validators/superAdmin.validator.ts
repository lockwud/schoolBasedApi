import {z} from "zod"

export const superAdminSchema = z.object({
    fullname: z.string({required_error: "Full name is required"}).trim().min(3, "Full name should be at least 3 characters long"),
    email: z.string().email({message: "Invalid email address"}),
    password: z.string({required_error: "Password is required"}).min(8, "Password should be at least 8 characters long")
    .trim()
    .min(1, "Invalid password format"),
    phone: z.string({required_error: "Phone number is required"}).trim().min(10, "Phone number should be at least 10 digits long").max(13, "Phone number should be at most 13 digits long"),
    status: z.enum(["active", "inactive", "deleted"]),
    otp: z.string({required_error: "Please enter otp"}).optional(),
    roles: z.array(z.enum(["superAdmin", "admin", "tutor", "student", "guardian", "parent"])).optional(),

})

export type superAdminData = z.infer<typeof superAdminSchema>
