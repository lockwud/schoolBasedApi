import { school } from './../../prisma/generated/super/index.d';
import {z} from "zod"

export const superAdminSchema = z.object({
    fullname: z.string({required_error: "Full name is required"}).trim().min(3, "Full name should be at least 3 characters long"),
    email: z.string().email({message: "Invalid email address"}),
    password: z.string({required_error: "Password is required"}).min(8, "Password should be at least 8 characters long")
    .trim()
    .min(1, "Invalid password format"),
    phone: z.string({required_error: "Phone number is required"}).trim().min(10, "Phone number should be at least 10 digits long").max(10, "Phone number should be at most 10 digits long"),
    status: z.enum(["inactive", "active", "suspended"]),
    otp: z.string({required_error: "Please enter otp"}).optional(),
    roles: z.array(z.enum(["super"])).optional(),

})

export const schoolSchema =  z.object({
    schoolName: z.string({required_error: "School name is required"}).trim().min(1, "required"),
    type: z.enum(["private", "government"]),
    databaseName:  z.string({required_error: "Db name is required"}),
    databaseUrl:z.string({required_error: "Db URL is required"}),
    contact: z.string().optional(),
    email: z.string().optional(),
    logoUrl: z.string().optional(),
    logoKey: z.string().optional(),
    address: z.string().optional(),
    subscriptionDate: z.preprocess(
        (arg) => {
          if (typeof arg === "string") {
            const parsedDate = new Date(arg);
            console.log("Preprocessed Date:", arg);
            return isNaN(parsedDate.getTime()) ? null : parsedDate;
          }
          return arg;
        },
        z.date({
          required_error: "Please provide a valid date",
        })
         .max(new Date(), "Date cannot be in the future")
      ),
    endOfLife: z.preprocess(
        (arg) => {
          if (typeof arg === "string") {
            const parsedDate = new Date(arg);
            console.log("Preprocessed Date:", arg);
            return isNaN(parsedDate.getTime()) ? null : parsedDate;
          }
          return arg;
        },
        z.date({
          required_error: "Please provide a valid date",
        }).min(new Date(), "Date cannot be in the past")
      ),
})

export type superAdminData = z.infer<typeof superAdminSchema>
export type schoolData = z.infer<typeof schoolSchema>
